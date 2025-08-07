import { EscuelasService } from './escuela.service';
import { CreateEscuelaDto } from 'src/dtos/escuela-create.dto';
import { UpdateEscuelaDto } from 'src/dtos/escuela-update.dto';
export declare class EscuelasController {
    private readonly escuelasService;
    constructor(escuelasService: EscuelasService);
    create(createEscuelaDto: CreateEscuelaDto): Promise<import("../../entities/escuela.entity").Escuela>;
    findAll(): Promise<import("../../entities/escuela.entity").Escuela[]>;
    findOne(id: number): Promise<import("../../entities/escuela.entity").Escuela>;
    update(id: number, updateEscuelaDto: UpdateEscuelaDto): Promise<import("../../entities/escuela.entity").Escuela>;
    remove(id: number): Promise<void>;
}
