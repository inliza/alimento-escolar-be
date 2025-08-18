import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEscuelaDto } from 'src/dtos/escuela-create.dto';
import { UpdateEscuelaDto } from 'src/dtos/escuela-update.dto';
import { Distrito } from 'src/entities/distrito.entity';
import { Escuela } from 'src/entities/escuela.entity';
import { Localidad } from 'src/entities/localidad.entity';
import { Provincia } from 'src/entities/provincia.entity';
import { ServiceResponse } from 'src/helpers/service-response';
import { Repository } from 'typeorm';


@Injectable()
export class EscuelasService {
  constructor(
    @InjectRepository(Escuela)
    private readonly escuelaRepository: Repository<Escuela>,
    @InjectRepository(Provincia)
    private readonly provinciaRepository: Repository<Provincia>,
    @InjectRepository(Localidad)
    private readonly localidadRepository: Repository<Localidad>,
    @InjectRepository(Distrito)
    private readonly distritoRepository: Repository<Distrito>,

  ) { }

  async create(createEscuelaDto: CreateEscuelaDto, idCompany: number): Promise<ServiceResponse<any>> {

    createEscuelaDto.idCompany = idCompany;

    const existingEscuela = await this.findOneByCode(createEscuelaDto.codigoEscuela, idCompany);
    if (existingEscuela) {
      return new ServiceResponse(400, `Ya existe una escuela con este codigo ${createEscuelaDto.codigoEscuela}`);
    }

    const escuela = this.escuelaRepository.create(createEscuelaDto);
    await this.escuelaRepository.save(escuela);
    return new ServiceResponse(
      201,
      `Escuela ${escuela.nombre} creada correctamente`);
  }

  async findAll(companyId: number): Promise<ServiceResponse<Escuela[]>> {

    const res = await this.escuelaRepository.find({
      relations: ['localidad', 'distrito', 'company'],
      where: { idCompany: companyId, deleted: false },
      order: { id: 'ASC' }
    });

    return new ServiceResponse(
      200,
      res
    );
  }

  async findAllProvince(): Promise<ServiceResponse<Provincia[]>> {
    const res = await this.provinciaRepository.find();
    return new ServiceResponse(
      200,
      res
    );
  }

  async findAllLocalidades(idProvince: number): Promise<ServiceResponse<Localidad[]>> {
    const res = await this.localidadRepository.find({
      where: { idprovincia: idProvince }
    });
    return new ServiceResponse(
      200,
      res
    );
  }

  async findAllDistritos(idProvince: number): Promise<ServiceResponse<Distrito[]>> {
    const res = await this.distritoRepository.find({
      where: { idprovincia: idProvince }
    });
    return new ServiceResponse(
      200,
      res
    );
  }

  async findById(id: number): Promise<ServiceResponse<Escuela | null>> {
    const escuela = await this.escuelaRepository.findOne({
      where: { id, deleted: false },
      relations: ['localidad', 'distrito', 'company'],
    });
    if (!escuela) {
      return new ServiceResponse(
        404,
        null,
        `Escuela no encontrada`
      );

    }
    return new ServiceResponse(
      200,
      escuela
    );
  }

  private async findOne(id: number): Promise<Escuela> {
    const escuela = await this.escuelaRepository.findOne({
      where: { id, deleted: false },
    });
    if (!escuela) {
      throw new NotFoundException(`Escuela with ID ${id} not found`);
    }
    return escuela;
  }

  async findOneByCode(code: string, idCompany: number): Promise<any> {
    const escuela = await this.escuelaRepository.findOne({
      where: { codigoEscuela: code, idCompany: idCompany, deleted: false },
    });
    return escuela;
  }

  async update(id: number, updateEscuelaDto: UpdateEscuelaDto, idCompany: number): Promise<ServiceResponse<Escuela | any>> {

    const escuela = await this.escuelaRepository.preload({
      id,
      ...updateEscuelaDto,
    });


    if (escuela?.idCompany !== idCompany) {
      return new ServiceResponse(403, `No tienes permiso para eliminar esta escuela`);
    }
    if (!escuela) {
      return new ServiceResponse(404, null, `Escuela no encontrada`);
    }

    await this.escuelaRepository.save(escuela);
    return new ServiceResponse(
      200,
      escuela,
      `Escuela ${escuela.nombre} actualizada correctamente`
    );

  }

  async remove(id: number, idCompany: number): Promise<ServiceResponse<string>> {
    const escuela = await this.findOne(id);
    if (!escuela) {
      return new ServiceResponse(404, `Escuela no encontrada`);
    }
    if (escuela.idCompany !== idCompany) {
      return new ServiceResponse(403, `No tienes permiso para eliminar esta escuela`);
    }
    escuela.deleted = true; // Soft delete
    await this.escuelaRepository.save(escuela);
    return new ServiceResponse(
      200,
      `Escuela eliiminada correctamente`
    );
  }
}