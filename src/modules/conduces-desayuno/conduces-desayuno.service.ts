import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateConduceDto } from 'src/dtos/conduce-desayuno-create.dto';
import { ArticuloDesayuno } from 'src/entities/articulos-desayuno.entity';
import { ConduceDesayuno } from 'src/entities/conduces-desayuno.entity';
import { ServiceResponse } from 'src/helpers/service-response';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ConduceDesayunoService {
    constructor(
        @InjectRepository(ConduceDesayuno)
        private readonly conduceRepo: Repository<ConduceDesayuno>,
        private readonly dataSource: DataSource
    ) { }


    async getRelacionPivot(
        companyId: number,
        desde: string,                 // 'YYYY-MM-DD'
        hasta?: string,                // 'YYYY-MM-DD' (opcional)
        escuelaId: number = 0,         // 0 = todas
    ): Promise<ServiceResponse<any[] | null>> {
        try {
            if (!companyId || !desde) {
                return new ServiceResponse(400, null, 'companyId y desde son requeridos.');
            }

            // Normaliza fechas si vienen invertidas
            let d1 = desde;
            let d2 = hasta;
            if (d2 && d2 < d1) [d1, d2] = [d2, d1];

            // 1) Traer artículos para construir columnas dinámicas
            const articulos = await this.dataSource.getRepository(ArticuloDesayuno).find({
                select: ['id', 'nombre'],
                order: { id: 'ASC' },
            });
            if (!articulos.length) {
                return new ServiceResponse(200, []);
            }

            // 2) Columnas dinámicas tipo SUM(CASE...) AS "a<ID>"
            const articuloCols = articulos
                .map(a => `SUM(CASE WHEN c.articuloid = ${a.id} THEN c.cantidad ELSE 0 END) AS "a${a.id}"`)
                .join(',\n          ');

            // 3) WHERE con placeholders posicionales
            const whereParts: string[] = [
                `c.deleted = FALSE`,
                `c.companyid = $1`,
            ];
            const paramsArr: any[] = [companyId];
            let paramIndex = 2;

            if (d2) {
                whereParts.push(`c.fecha_entrega BETWEEN $${paramIndex} AND $${paramIndex + 1}`);
                paramsArr.push(d1, d2);
                paramIndex += 2;
            } else {
                whereParts.push(`c.fecha_entrega = $${paramIndex}`);
                paramsArr.push(d1);
                paramIndex += 1;
            }

            if (Number(escuelaId) > 0) {
                whereParts.push(`c.escuelaid = $${paramIndex}`);
                paramsArr.push(escuelaId);
                paramIndex += 1;
            }

            const sql = `
      SELECT
        to_char(c.fecha_entrega, 'YYYY-MM-DD') AS "fecha",
        c.codigo_conduce                        AS "numeroConduce",
        e.codigoescuela                        AS "codigoEscuela",
        e.nombre                                AS "nombreEscuela",
        ${articuloCols}
      FROM public.conduces_desayuno c
      JOIN public.escuelas e ON e.id = c.escuelaid
      WHERE
        ${whereParts.join('\n        AND ')}
      GROUP BY
        c.fecha_entrega, c.codigo_conduce, e.codigoescuela, e.nombre
      ORDER BY
        c.fecha_entrega ASC, c.codigo_conduce ASC;
    `;

            const rows = await this.dataSource.query(sql, paramsArr);

            return new ServiceResponse(200, rows);
        } catch (error) {
            return new ServiceResponse(500, null, 'Error generando relación pivotada.', error);
        }
    }

    async createBulk(
        dtos: CreateConduceDto[], companyId: number
    ): Promise<ServiceResponse<ConduceDesayuno[] | null>> {

        if (!Array.isArray(dtos) || dtos.length === 0) {
            return new ServiceResponse(400, null, 'Debe proporcionar al menos un conduce.');
        }

        const qr = this.dataSource.createQueryRunner();
        await qr.connect();
        await qr.startTransaction();

        try {
            const created: ConduceDesayuno[] = [];

            for (const dto of dtos) {
                const itbis = Number(dto.itbis ?? 0);
                const cantidad = Number(dto.cantidad);
                const precio = Number(dto.precio);

                // 👉 Si NO quieres sumar itbis al total, usa: const total = cantidad * precio;
                const subtotal = cantidad * precio;
                const total = subtotal + itbis;

                const entity = qr.manager.create(ConduceDesayuno, {
                    codigoConduce: dto.codigo, // soporta ambos nombres
                    companyId: companyId,
                    escuelaId: dto.escuelaId,
                    articuloId: dto.articuloId,
                    cantidad,
                    precio,
                    total,
                    itbis,
                    fechaEntrega: dto.fecha, // espera 'YYYY-MM-DD'
                    deleted: false,
                });

                const result = await qr.manager.insert(ConduceDesayuno, entity);

                const newId = result.identifiers[0]?.id;
                const saved = await qr.manager.findOne(ConduceDesayuno, {
                    where: { id: newId },
                    relations: { articulo: true, escuela: true, company: true },
                });

                if (!saved) {
                    // Cierra correctamente la transacción en caso excepcional
                    await qr.rollbackTransaction();
                    return new ServiceResponse(400, null, 'No se pudo recuperar el conduce insertado.');
                }

                created.push(saved);
            }

            await qr.commitTransaction();
            return new ServiceResponse(200, created);
        } catch (err: any) {
            await qr.rollbackTransaction();
            return this.mapPgErrorToServiceResponse(err);
        } finally {
            await qr.release();
        }
    }

    async findByFechaRango(
        companyId: number,
        desde: string,          // 'YYYY-MM-DD'
        hasta?: string,         // 'YYYY-MM-DD' (opcional)
        escuelaId: number = 0,  // 0 = todas las escuelas
    ): Promise<ServiceResponse<ConduceDesayuno[] | null>> {
        try {
            if (!companyId || !desde) {
                return new ServiceResponse(400, null, 'companyId y desde son requeridos.');
            }

            // Normaliza y corrige si vienen invertidas
            let d1 = desde;
            let d2 = hasta;
            if (d2 && d2 < d1) {
                [d1, d2] = [d2, d1];
            }

            const qb = this.conduceRepo
                .createQueryBuilder('c')
                .leftJoinAndSelect('c.escuela', 'escuela')
                .leftJoinAndSelect('escuela.localidad', 'localidad') // 👈 añade localidad
                .leftJoinAndSelect('escuela.distrito', 'distrito')   // 👈 añade distrito
                .leftJoinAndSelect('c.articulo', 'articulo')
                .where('c.deleted = false')
                .andWhere('c.companyId = :companyId', { companyId });

            // Fecha
            if (d2) {
                qb.andWhere('c.fechaEntrega BETWEEN :d1 AND :d2', { d1, d2 });
            } else {
                qb.andWhere('c.fechaEntrega = :d1', { d1 });
            }

            // Escuela (0 = todas)
            if (Number(escuelaId) > 0) {
                qb.andWhere('c.escuelaId = :escuelaId', { escuelaId });
            }

            const data = await qb
                .orderBy('c.fechaEntrega', 'ASC')
                .addOrderBy('c.codigoConduce', 'ASC')
                .getMany();

            return new ServiceResponse(200, data);
        } catch (error) {
            return new ServiceResponse(500, null, 'Error al filtrar conduces por fecha.', error);
        }
    }

    async findByCodigo(
        codigoConduce: number,
        companyId: number,
        deleted: boolean,
    ): Promise<ServiceResponse<any | null>> {
        const res = await this.conduceRepo
            .createQueryBuilder('c')
            .leftJoinAndSelect('c.escuela', 'escuela')
            .leftJoinAndSelect('escuela.localidad', 'localidad')
            .leftJoinAndSelect('escuela.distrito', 'distrito')
            .leftJoinAndSelect('c.articulo', 'articulo')
            .where('c.codigoConduce = :codigoConduce', { codigoConduce })
            .andWhere('c.companyId = :companyId', { companyId })
            .andWhere('c.deleted = :deleted', { deleted })
            .getMany();

        return new ServiceResponse(res.length > 0 ? 200 : 404, res);

    }

    async findByFechaRangoDeleted(
        companyId: number,
        desde: string,          // 'YYYY-MM-DD'
        hasta?: string,         // 'YYYY-MM-DD' (opcional)
        escuelaId: number = 0,  // 0 = todas las escuelas
    ): Promise<ServiceResponse<ConduceDesayuno[] | null>> {
        try {
            if (!companyId || !desde) {
                return new ServiceResponse(400, null, 'companyId y desde son requeridos.');
            }

            // Normaliza y corrige si vienen invertidas
            let d1 = desde;
            let d2 = hasta;
            if (d2 && d2 < d1) {
                [d1, d2] = [d2, d1];
            }

            const qb = this.conduceRepo
                .createQueryBuilder('c')
                .leftJoinAndSelect('c.escuela', 'escuela')
                .leftJoinAndSelect('escuela.localidad', 'localidad') // 👈 añade localidad
                .leftJoinAndSelect('escuela.distrito', 'distrito')   // 👈 añade distrito
                .leftJoinAndSelect('c.articulo', 'articulo')
                .where('c.deleted = true')
                .andWhere('c.companyId = :companyId', { companyId });

            // Fecha
            if (d2) {
                qb.andWhere('c.fechaEntrega BETWEEN :d1 AND :d2', { d1, d2 });
            } else {
                qb.andWhere('c.fechaEntrega = :d1', { d1 });
            }

            // Escuela (0 = todas)
            if (Number(escuelaId) > 0) {
                qb.andWhere('c.escuelaId = :escuelaId', { escuelaId });
            }

            const data = await qb
                .orderBy('c.fechaEntrega', 'ASC')
                .addOrderBy('c.codigoConduce', 'ASC')
                .getMany();

            return new ServiceResponse(200, data);
        } catch (error) {
            return new ServiceResponse(500, null, 'Error al filtrar conduces eliminados por fecha.', error);
        }
    }

    async softDelete(id: number, companyId?: number): Promise<ServiceResponse<string | null>> {
        try {
            const qb = this.conduceRepo.createQueryBuilder('c')
                .where('c.id = :id', { id });

            if (companyId) {
                qb.andWhere('c.companyId = :companyId', { companyId });
            }

            const conduce = await qb.getOne();

            if (!conduce) {
                return new ServiceResponse(404, null, 'Conduce no encontrado');
            }

            if (conduce.deleted) {
                return new ServiceResponse(400, null, 'El conduce ya estaba eliminado');
            }

            conduce.deleted = true;
            await this.conduceRepo.save(conduce);

            return new ServiceResponse(200, null, 'Conduce eliminado correctamente');
        } catch (error) {
            return new ServiceResponse(500, null, 'Error eliminando conduce', error);
        }
    }

    async getUltimasFechasConTotales(
        companyId: number
    ): Promise<ServiceResponse<{ fecha: string; total: number }[] | null>> {
        try {
            const data = await this.conduceRepo
                .createQueryBuilder('c')
                .select('c.fechaEntrega', 'fecha')
                .addSelect('COUNT(c.codigoConduce)', 'total')
                .where('c.companyId = :companyId', { companyId })
                .andWhere('c.deleted = false')
                .groupBy('c.fechaEntrega')
                .orderBy('c.fechaEntrega', 'DESC')
                .limit(9)
                .getRawMany<{ fecha: string; total: string }>();

            // casteo a número
            const result = data.map(d => ({
                fecha: d.fecha,
                total: Number(d.total),
            }));

            return new ServiceResponse(200, result);
        } catch (error) {
            return new ServiceResponse(
                500,
                null,
                'Error obteniendo totales por fecha',
                error,
            );
        }
    }
    async restoreConduces(ids: number[]): Promise<ServiceResponse<string | null>> {
        try {
            await this.conduceRepo.update(ids, { deleted: false });
            return new ServiceResponse(200, null, 'Conduces restaurados correctamente.');
        } catch (error: any) {
            const code = error?.code ?? error?.driverError?.code;

            if (code === '23505') {
                const detail = error?.detail ?? error?.driverError?.detail ?? '';
                const parsed = this.parseUniqueDetail(detail);

                const friendly =
                    parsed
                        ? `Ya existe un conduce activo para la escuela ${parsed.escuelaid} el ${parsed.fecha_entrega} (en esta cuenta).`
                        : 'Ya existe un conduce activo con la misma fecha y escuela.';

                return new ServiceResponse(409, null, friendly, error);
            }

            return new ServiceResponse(500, null, 'Error restaurando conduces', error);
        }
    }

    async softDeleteBulk(ids: number[], companyId?: number): Promise<ServiceResponse<string | null>> {
        try {
            if (!Array.isArray(ids) || ids.length === 0) {
                return new ServiceResponse(400, null, 'Debe proporcionar al menos un id.');
            }

            const qb = this.conduceRepo.createQueryBuilder()
                .update(ConduceDesayuno)
                .set({ deleted: true })
                .whereInIds(ids);

            if (companyId) {
                qb.andWhere('companyId = :companyId', { companyId });
            }

            await qb.execute();

            return new ServiceResponse(200, null, 'Conduces eliminados correctamente');
        } catch (error) {
            return new ServiceResponse(500, null, 'Error eliminando conduces', error);
        }
    }

    /** Traduce errores comunes de Postgres a ServiceResponse legible */
    private mapPgErrorToServiceResponse(
        err: any
    ): ServiceResponse<null> {
        // Puedes loguear el error crudo aquí si quieres observabilidad
        // this.logger?.error(err);

        const code = err?.code as string | undefined;
        const constraint = err?.constraint as string | undefined;
        const detail = err?.detail as string | undefined;
        const messageBase = detail || err?.message || 'Error al procesar la solicitud.';

        // unique_violation
        if (code === '23505') {
            // Si quieres mensajes más específicos por constraint:
            // - ux_conduces_activos_codigo_company
            // - ux_conduces_activos_fecha_company_escuela
            let msg = 'Violación de unicidad. Ya existe un registro con valores únicos duplicados.';
            if (constraint) {
                if (constraint.includes('codigo') && constraint.includes('company')) {
                    msg = 'El código de conduce ya existe para esa compañía (registro activo).';
                } else if (constraint.includes('fecha') && constraint.includes('escuela')) {
                    msg = 'Se está intentando crear un conduce duplicado: ya existe uno en una de estas escuela en la fecha seleccionada';
                }
            }
            return new ServiceResponse(409, null, msg, { code, constraint, detail });
        }

        // foreign_key_violation
        if (code === '23503') {
            return new ServiceResponse(
                400,
                null,
                'Violación de llave foránea. Verifique companyId/escuelaId/articuloId.',
                { code, constraint, detail }
            );
        }

        // check_violation
        if (code === '23514') {
            return new ServiceResponse(
                400,
                null,
                'Violación de restricción CHECK. Revise campos como cantidad, precio o total.',
                { code, constraint, detail }
            );
        }

        // not_null_violation
        if (code === '23502') {
            return new ServiceResponse(
                400,
                null,
                'Campo requerido ausente (NOT NULL). Revise los datos enviados.',
                { code, constraint, detail }
            );
        }

        // invalid_text_representation (ej: fecha o número inválido)
        if (code === '22P02') {
            return new ServiceResponse(
                400,
                null,
                'Formato de dato inválido (por ejemplo, fecha o número).',
                { code, constraint, detail }
            );
        }

        // default: error desconocido
        return new ServiceResponse(
            500,
            null,
            'Error interno al crear conduces.',
            { code, constraint, detail, raw: err }
        );
    }

    private parseUniqueDetail(detail: string): { fecha_entrega: string; companyid: string; escuelaid: string } | null {
        // Match: Key (fecha_entrega, companyid, escuelaid)=(2025-08-27, 2, 5) already exists.
        const m = detail.match(/Key \(([^)]+)\)=\(([^)]+)\)/i);
        if (!m) return null;

        const cols = m[1].split(',').map(s => s.trim());
        const vals = m[2].split(',').map(s => s.trim());

        const obj: Record<string, string> = {};
        cols.forEach((c, i) => (obj[c] = vals[i]));

        // Normaliza claves esperadas si están presentes
        const fecha = obj['fecha_entrega'];
        const company = obj['companyid'];
        const escuela = obj['escuelaid'];

        if (fecha && company && escuela) {
            return { fecha_entrega: fecha, companyid: company, escuelaid: escuela };
        }
        return null;
    }

    async getSiguienteCodigo(companyId: number, base = 19002): Promise<ServiceResponse<any>> {
        const ultimo = await this.getUltimoConducePorCompany(companyId);
        const next = ultimo ? ultimo.codigoConduce + 1 : base;

        return new ServiceResponse(200, { nextCode: next });
    }

    private async getUltimoConducePorCompany(companyId: number): Promise<ConduceDesayuno | null> {
        return this.conduceRepo.findOne({
            where: { companyId, deleted: false },
            order: { codigoConduce: 'DESC' },
        });
    }



}