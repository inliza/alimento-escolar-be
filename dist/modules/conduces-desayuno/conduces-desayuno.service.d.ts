import { CreateConduceDto } from 'src/dtos/conduce-desayuno-create.dto';
import { ConduceDesayuno } from 'src/entities/conduces-desayuno.entity';
import { ServiceResponse } from 'src/helpers/service-response';
import { DataSource, Repository } from 'typeorm';
export declare class ConduceDesayunoService {
    private readonly conduceRepo;
    private readonly dataSource;
    constructor(conduceRepo: Repository<ConduceDesayuno>, dataSource: DataSource);
    getRelacionPivot(companyId: number, desde: string, hasta?: string, escuelaId?: number): Promise<ServiceResponse<any[] | null>>;
    createBulk(dtos: CreateConduceDto[], companyId: number): Promise<ServiceResponse<ConduceDesayuno[] | null>>;
    findByFechaRango(companyId: number, desde: string, hasta?: string, escuelaId?: number): Promise<ServiceResponse<ConduceDesayuno[] | null>>;
    findByFechaRangoDeleted(companyId: number, desde: string, hasta?: string, escuelaId?: number): Promise<ServiceResponse<ConduceDesayuno[] | null>>;
    softDelete(id: number, companyId?: number): Promise<ServiceResponse<string | null>>;
    getUltimasFechasConTotales(companyId: number): Promise<ServiceResponse<{
        fecha: string;
        total: number;
    }[] | null>>;
    restoreConduces(ids: number[]): Promise<ServiceResponse<string | null>>;
    softDeleteBulk(ids: number[], companyId?: number): Promise<ServiceResponse<string | null>>;
    private mapPgErrorToServiceResponse;
    private parseUniqueDetail;
    getSiguienteCodigo(companyId: number, base?: number): Promise<ServiceResponse<any>>;
    private getUltimoConducePorCompany;
}
