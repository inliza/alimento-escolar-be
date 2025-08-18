import { CreateEscuelaDto } from 'src/dtos/escuela-create.dto';
import { UpdateEscuelaDto } from 'src/dtos/escuela-update.dto';
import { Distrito } from 'src/entities/distrito.entity';
import { Escuela } from 'src/entities/escuela.entity';
import { Localidad } from 'src/entities/localidad.entity';
import { Provincia } from 'src/entities/provincia.entity';
import { ServiceResponse } from 'src/helpers/service-response';
import { Repository } from 'typeorm';
export declare class EscuelasService {
    private readonly escuelaRepository;
    private readonly provinciaRepository;
    private readonly localidadRepository;
    private readonly distritoRepository;
    constructor(escuelaRepository: Repository<Escuela>, provinciaRepository: Repository<Provincia>, localidadRepository: Repository<Localidad>, distritoRepository: Repository<Distrito>);
    create(createEscuelaDto: CreateEscuelaDto, idCompany: number): Promise<ServiceResponse<any>>;
    findAll(companyId: number): Promise<ServiceResponse<Escuela[]>>;
    findAllProvince(): Promise<ServiceResponse<Provincia[]>>;
    findAllLocalidades(idProvince: number): Promise<ServiceResponse<Localidad[]>>;
    findAllDistritos(idProvince: number): Promise<ServiceResponse<Distrito[]>>;
    findById(id: number): Promise<ServiceResponse<Escuela | null>>;
    private findOne;
    findOneByCode(code: string, idCompany: number): Promise<any>;
    update(id: number, updateEscuelaDto: UpdateEscuelaDto, idCompany: number): Promise<ServiceResponse<Escuela | any>>;
    remove(id: number, idCompany: number): Promise<ServiceResponse<string>>;
}
