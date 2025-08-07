import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEscuelaDto } from 'src/dtos/escuela-create.dto';
import { UpdateEscuelaDto } from 'src/dtos/escuela-update.dto';
import { Escuela } from 'src/entities/escuela.entity';
import { Repository } from 'typeorm';


@Injectable()
export class EscuelasService {
  constructor(
    @InjectRepository(Escuela)
    private readonly escuelaRepository: Repository<Escuela>,
  ) {}

  async create(createEscuelaDto: CreateEscuelaDto): Promise<Escuela> {
    const escuela = this.escuelaRepository.create(createEscuelaDto);
    return this.escuelaRepository.save(escuela);
  }

  findAll(): Promise<Escuela[]> {
    return this.escuelaRepository.find({
      relations: ['localidad', 'distrito', 'company'],
    });
  }

  async findOne(id: number): Promise<Escuela> {
    const escuela = await this.escuelaRepository.findOne({
      where: { id },
      relations: ['localidad', 'distrito', 'company'],
    });
    if (!escuela) {
      throw new NotFoundException(`Escuela with ID ${id} not found`);
    }
    return escuela;
  }

  async update(id: number, updateEscuelaDto: UpdateEscuelaDto): Promise<Escuela> {
    const escuela = await this.escuelaRepository.preload({
      id,
      ...updateEscuelaDto,
    });
    if (!escuela) {
      throw new NotFoundException(`Escuela with ID ${id} not found`);
    }
    return this.escuelaRepository.save(escuela);
  }

  async remove(id: number): Promise<void> {
    const escuela = await this.findOne(id);
    await this.escuelaRepository.remove(escuela);
  }
}