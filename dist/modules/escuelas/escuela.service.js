"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EscuelasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const distrito_entity_1 = require("../../entities/distrito.entity");
const escuela_entity_1 = require("../../entities/escuela.entity");
const localidad_entity_1 = require("../../entities/localidad.entity");
const provincia_entity_1 = require("../../entities/provincia.entity");
const service_response_1 = require("../../helpers/service-response");
const typeorm_2 = require("typeorm");
let EscuelasService = class EscuelasService {
    escuelaRepository;
    provinciaRepository;
    localidadRepository;
    distritoRepository;
    constructor(escuelaRepository, provinciaRepository, localidadRepository, distritoRepository) {
        this.escuelaRepository = escuelaRepository;
        this.provinciaRepository = provinciaRepository;
        this.localidadRepository = localidadRepository;
        this.distritoRepository = distritoRepository;
    }
    async create(createEscuelaDto, idCompany) {
        createEscuelaDto.idCompany = idCompany;
        const existingEscuela = await this.findOneByCode(createEscuelaDto.codigoEscuela, idCompany);
        if (existingEscuela) {
            return new service_response_1.ServiceResponse(400, `Ya existe una escuela con este codigo ${createEscuelaDto.codigoEscuela}`);
        }
        const escuela = this.escuelaRepository.create(createEscuelaDto);
        await this.escuelaRepository.save(escuela);
        return new service_response_1.ServiceResponse(201, `Escuela ${escuela.nombre} creada correctamente`);
    }
    async findAll(companyId) {
        const res = await this.escuelaRepository.find({
            relations: ['localidad', 'distrito', 'company'],
            where: { idCompany: companyId, deleted: false },
            order: { id: 'ASC' }
        });
        return new service_response_1.ServiceResponse(200, res);
    }
    async findAllProvince() {
        const res = await this.provinciaRepository.find();
        return new service_response_1.ServiceResponse(200, res);
    }
    async findAllLocalidades(idProvince) {
        const res = await this.localidadRepository.find({
            where: { idprovincia: idProvince }
        });
        return new service_response_1.ServiceResponse(200, res);
    }
    async findAllDistritos(idProvince) {
        const res = await this.distritoRepository.find({
            where: { idprovincia: idProvince }
        });
        return new service_response_1.ServiceResponse(200, res);
    }
    async findById(id) {
        const escuela = await this.escuelaRepository.findOne({
            where: { id, deleted: false },
            relations: ['localidad', 'distrito', 'company'],
        });
        if (!escuela) {
            return new service_response_1.ServiceResponse(404, null, `Escuela no encontrada`);
        }
        return new service_response_1.ServiceResponse(200, escuela);
    }
    async findOne(id) {
        const escuela = await this.escuelaRepository.findOne({
            where: { id, deleted: false },
        });
        if (!escuela) {
            throw new common_1.NotFoundException(`Escuela with ID ${id} not found`);
        }
        return escuela;
    }
    async findOneByCode(code, idCompany) {
        const escuela = await this.escuelaRepository.findOne({
            where: { codigoEscuela: code, idCompany: idCompany, deleted: false },
        });
        return escuela;
    }
    async update(id, updateEscuelaDto, idCompany) {
        const escuela = await this.escuelaRepository.preload({
            id,
            ...updateEscuelaDto,
        });
        if (escuela?.idCompany !== idCompany) {
            return new service_response_1.ServiceResponse(403, `No tienes permiso para eliminar esta escuela`);
        }
        if (!escuela) {
            return new service_response_1.ServiceResponse(404, null, `Escuela no encontrada`);
        }
        await this.escuelaRepository.save(escuela);
        return new service_response_1.ServiceResponse(200, escuela, `Escuela ${escuela.nombre} actualizada correctamente`);
    }
    async remove(id, idCompany) {
        const escuela = await this.findOne(id);
        if (!escuela) {
            return new service_response_1.ServiceResponse(404, `Escuela no encontrada`);
        }
        if (escuela.idCompany !== idCompany) {
            return new service_response_1.ServiceResponse(403, `No tienes permiso para eliminar esta escuela`);
        }
        escuela.deleted = true;
        await this.escuelaRepository.save(escuela);
        return new service_response_1.ServiceResponse(200, `Escuela eliiminada correctamente`);
    }
};
exports.EscuelasService = EscuelasService;
exports.EscuelasService = EscuelasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(escuela_entity_1.Escuela)),
    __param(1, (0, typeorm_1.InjectRepository)(provincia_entity_1.Provincia)),
    __param(2, (0, typeorm_1.InjectRepository)(localidad_entity_1.Localidad)),
    __param(3, (0, typeorm_1.InjectRepository)(distrito_entity_1.Distrito)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], EscuelasService);
//# sourceMappingURL=escuela.service.js.map