"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConduceDesayunoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const conduces_desayuno_entity_1 = require("../../entities/conduces-desayuno.entity");
const service_response_1 = require("../../helpers/service-response");
const typeorm_2 = require("typeorm");
let ConduceDesayunoService = class ConduceDesayunoService {
    conduceRepo;
    dataSource;
    constructor(conduceRepo, dataSource) {
        this.conduceRepo = conduceRepo;
        this.dataSource = dataSource;
    }
    async createBulk(dtos, companyId) {
        if (!Array.isArray(dtos) || dtos.length === 0) {
            return new service_response_1.ServiceResponse(400, null, 'Debe proporcionar al menos un conduce.');
        }
        const qr = this.dataSource.createQueryRunner();
        await qr.connect();
        await qr.startTransaction();
        try {
            const created = [];
            for (const dto of dtos) {
                const itbis = Number(dto.itbis ?? 0);
                const cantidad = Number(dto.cantidad);
                const precio = Number(dto.precio);
                const subtotal = cantidad * precio;
                const total = subtotal + itbis;
                const entity = qr.manager.create(conduces_desayuno_entity_1.ConduceDesayuno, {
                    codigoConduce: dto.codigo,
                    companyId: companyId,
                    escuelaId: dto.escuelaId,
                    articuloId: dto.articuloId,
                    cantidad,
                    precio,
                    total,
                    itbis,
                    fechaEntrega: new Date(dto.fecha),
                    deleted: false,
                });
                const result = await qr.manager.insert(conduces_desayuno_entity_1.ConduceDesayuno, entity);
                const newId = result.identifiers[0]?.id;
                const saved = await qr.manager.findOne(conduces_desayuno_entity_1.ConduceDesayuno, {
                    where: { id: newId },
                    relations: { articulo: true, escuela: true, company: true },
                });
                if (!saved) {
                    await qr.rollbackTransaction();
                    return new service_response_1.ServiceResponse(400, null, 'No se pudo recuperar el conduce insertado.');
                }
                created.push(saved);
            }
            await qr.commitTransaction();
            return new service_response_1.ServiceResponse(200, created);
        }
        catch (err) {
            await qr.rollbackTransaction();
            return this.mapPgErrorToServiceResponse(err);
        }
        finally {
            await qr.release();
        }
    }
    async findByFechaRango(companyId, desde, hasta) {
        try {
            if (!companyId || !desde) {
                return new service_response_1.ServiceResponse(400, null, 'companyId y desde son requeridos.');
            }
            let d1 = desde;
            let d2 = hasta;
            if (d2 && d2 < d1) {
                [d1, d2] = [d2, d1];
            }
            const qb = this.conduceRepo
                .createQueryBuilder('c')
                .leftJoinAndSelect('c.escuela', 'escuela')
                .leftJoinAndSelect('c.articulo', 'articulo')
                .leftJoinAndSelect('c.company', 'company')
                .where('c.deleted = false')
                .andWhere('c.companyId = :companyId', { companyId });
            if (d2) {
                qb.andWhere('c.fechaEntrega BETWEEN :d1 AND :d2', { d1, d2 });
            }
            else {
                qb.andWhere('c.fechaEntrega = :d1', { d1 });
            }
            const data = await qb
                .orderBy('c.fechaEntrega', 'ASC')
                .addOrderBy('c.codigoConduce', 'ASC')
                .getMany();
            return new service_response_1.ServiceResponse(200, data);
        }
        catch (error) {
            return new service_response_1.ServiceResponse(500, null, 'Error al filtrar conduces por fecha.', error);
        }
    }
    async softDelete(id, companyId) {
        try {
            const qb = this.conduceRepo.createQueryBuilder('c')
                .where('c.id = :id', { id });
            if (companyId) {
                qb.andWhere('c.companyId = :companyId', { companyId });
            }
            const conduce = await qb.getOne();
            if (!conduce) {
                return new service_response_1.ServiceResponse(404, null, 'Conduce no encontrado');
            }
            if (conduce.deleted) {
                return new service_response_1.ServiceResponse(400, null, 'El conduce ya estaba eliminado');
            }
            conduce.deleted = true;
            await this.conduceRepo.save(conduce);
            return new service_response_1.ServiceResponse(200, null, 'Conduce eliminado correctamente');
        }
        catch (error) {
            return new service_response_1.ServiceResponse(500, null, 'Error eliminando conduce', error);
        }
    }
    async getUltimasFechasConTotales(companyId) {
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
                .getRawMany();
            const result = data.map(d => ({
                fecha: d.fecha,
                total: Number(d.total),
            }));
            return new service_response_1.ServiceResponse(200, result);
        }
        catch (error) {
            return new service_response_1.ServiceResponse(500, null, 'Error obteniendo totales por fecha', error);
        }
    }
    mapPgErrorToServiceResponse(err) {
        const code = err?.code;
        const constraint = err?.constraint;
        const detail = err?.detail;
        const messageBase = detail || err?.message || 'Error al procesar la solicitud.';
        if (code === '23505') {
            let msg = 'Violación de unicidad. Ya existe un registro con valores únicos duplicados.';
            if (constraint) {
                if (constraint.includes('codigo') && constraint.includes('company')) {
                    msg = 'El código de conduce ya existe para esa compañía (registro activo).';
                }
                else if (constraint.includes('fecha') && constraint.includes('escuela')) {
                    msg = 'Se está intentando crear un conduce duplicado: ya existe uno en una de estas escuela en la fecha seleccionada';
                }
            }
            return new service_response_1.ServiceResponse(409, null, msg, { code, constraint, detail });
        }
        if (code === '23503') {
            return new service_response_1.ServiceResponse(400, null, 'Violación de llave foránea. Verifique companyId/escuelaId/articuloId.', { code, constraint, detail });
        }
        if (code === '23514') {
            return new service_response_1.ServiceResponse(400, null, 'Violación de restricción CHECK. Revise campos como cantidad, precio o total.', { code, constraint, detail });
        }
        if (code === '23502') {
            return new service_response_1.ServiceResponse(400, null, 'Campo requerido ausente (NOT NULL). Revise los datos enviados.', { code, constraint, detail });
        }
        if (code === '22P02') {
            return new service_response_1.ServiceResponse(400, null, 'Formato de dato inválido (por ejemplo, fecha o número).', { code, constraint, detail });
        }
        return new service_response_1.ServiceResponse(500, null, 'Error interno al crear conduces.', { code, constraint, detail, raw: err });
    }
    async getSiguienteCodigo(companyId, base = 19002) {
        const ultimo = await this.getUltimoConducePorCompany(companyId);
        const next = ultimo ? ultimo.codigoConduce + 1 : base;
        return new service_response_1.ServiceResponse(200, { nextCode: next });
    }
    async getUltimoConducePorCompany(companyId) {
        return this.conduceRepo.findOne({
            where: { companyId, deleted: false },
            order: { codigoConduce: 'DESC' },
        });
    }
};
exports.ConduceDesayunoService = ConduceDesayunoService;
exports.ConduceDesayunoService = ConduceDesayunoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(conduces_desayuno_entity_1.ConduceDesayuno)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource])
], ConduceDesayunoService);
//# sourceMappingURL=conduces-desayuno.service.js.map