import { ConduceDesayunoService } from "./conduces-desayuno.service";
import { ServiceResponse } from "src/helpers/service-response";
import { CreateConduceDto } from "src/dtos/conduce-desayuno-create.dto";
export declare class ConducesDesayunoController {
    private readonly service;
    constructor(service: ConduceDesayunoService);
    findOne(request: any, response: any): Promise<ServiceResponse<any>>;
    createBulk(dtos: CreateConduceDto[], request: any, response: any): Promise<ServiceResponse>;
    getPorFecha(request: any, desde: string, hasta?: string, escuelaId?: string): Promise<ServiceResponse>;
    getPorFechaDeleted(request: any, desde: string, hasta?: string, escuelaId?: string): Promise<ServiceResponse>;
    softDelete(request: any, id: string): Promise<ServiceResponse<string | null>>;
    softDeleteBulk(ids: number[], request: any, response: any): Promise<any>;
    restore(ids: number[], response: any): Promise<any>;
    getData(request: any, response: any): Promise<ServiceResponse<any>>;
    getRelacion(request: any, response: any, desde: string, hasta?: string, escuelaId?: string): Promise<ServiceResponse>;
}
