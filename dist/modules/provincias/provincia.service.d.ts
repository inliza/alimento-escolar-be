import { Provincia } from 'src/entities/provincia.entity';
import { Repository } from 'typeorm';
export declare class ProvinciasService {
    private readonly provinciaRepository;
    constructor(provinciaRepository: Repository<Provincia>);
    findAll(): Promise<Provincia[]>;
    findOne(id: number): Promise<Provincia>;
    remove(id: number): Promise<void>;
}
