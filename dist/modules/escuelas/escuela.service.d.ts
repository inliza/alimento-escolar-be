import { CreateEscuelaDto } from 'src/dtos/escuela-create.dto';
import { UpdateEscuelaDto } from 'src/dtos/escuela-update.dto';
import { Escuela } from 'src/entities/escuela.entity';
import { Repository } from 'typeorm';
export declare class EscuelasService {
    private readonly escuelaRepository;
    constructor(escuelaRepository: Repository<Escuela>);
    create(createEscuelaDto: CreateEscuelaDto): Promise<Escuela>;
    findAll(): Promise<Escuela[]>;
    findOne(id: number): Promise<Escuela>;
    update(id: number, updateEscuelaDto: UpdateEscuelaDto): Promise<Escuela>;
    remove(id: number): Promise<void>;
}
