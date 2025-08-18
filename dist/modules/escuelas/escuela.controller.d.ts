import { EscuelasService } from './escuela.service';
import { CreateEscuelaDto } from 'src/dtos/escuela-create.dto';
import { UpdateEscuelaDto } from 'src/dtos/escuela-update.dto';
export declare class EscuelasController {
    private readonly escuelasService;
    constructor(escuelasService: EscuelasService);
    create(request: any, createEscuelaDto: CreateEscuelaDto): Promise<import("../../helpers/service-response").ServiceResponse<any>>;
    findAll(request: any, response: any): Promise<any>;
    findProvinces(response: any): Promise<any>;
    findDistritos(id: number, response: any): Promise<any>;
    findLocalidades(id: number, response: any): Promise<any>;
    findOne(id: number, response: any): Promise<any>;
    remove(id: number, response: any, request: any): Promise<any>;
    update(id: number, request: any, response: any, updateEscuelaDto: UpdateEscuelaDto): Promise<any>;
}
