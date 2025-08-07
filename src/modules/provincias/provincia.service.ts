
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Provincia } from 'src/entities/provincia.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProvinciasService {
    constructor(
        @InjectRepository(Provincia)
        private readonly provinciaRepository: Repository<Provincia>,
    ) { }


    findAll(): Promise<Provincia[]> {
        return this.provinciaRepository.find();
    }

    async findOne(id: number): Promise<Provincia> {
        const provincia = await this.provinciaRepository.findOne({ where: { id } });
        if (!provincia) {
            throw new NotFoundException(`Provincia with ID ${id} not found`);
        }
        return provincia;
    }


    async remove(id: number): Promise<void> {
        const provincia = await this.findOne(id);
        await this.provinciaRepository.remove(provincia);
    }
}