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
exports.ArticulosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const articulos_desayuno_entity_1 = require("../../entities/articulos-desayuno.entity");
const service_response_1 = require("../../helpers/service-response");
const typeorm_2 = require("typeorm");
let ArticulosService = class ArticulosService {
    articulosD;
    constructor(articulosD) {
        this.articulosD = articulosD;
    }
    async findAll() {
        try {
            const articulos = await this.articulosD.find();
            return new service_response_1.ServiceResponse(200, articulos);
        }
        catch (error) {
            return new service_response_1.ServiceResponse(500, null, 'Error fetching articles', error);
        }
    }
    async findById(id) {
        const articulo = await this.articulosD.findOne({ where: { id } });
        if (!articulo) {
            return new service_response_1.ServiceResponse(404, null, `Article with ID ${id} not found`);
        }
        return new service_response_1.ServiceResponse(200, articulo);
    }
    async findOne(id) {
        const articulo = await this.articulosD.findOne({ where: { id } });
        if (!articulo) {
            return null;
        }
        return articulo;
    }
    async remove(id) {
        const articulo = await this.articulosD.findOne({ where: { id } });
        if (!articulo) {
            return new service_response_1.ServiceResponse(404, `Article with ID ${id} not found`);
        }
        articulo.isDeleted = true;
        await this.articulosD.save(articulo);
        return new service_response_1.ServiceResponse(200, 'Article removed successfully');
    }
    async create(articulo) {
        const newArticulo = this.articulosD.create(articulo);
        return this.articulosD.save(newArticulo);
    }
};
exports.ArticulosService = ArticulosService;
exports.ArticulosService = ArticulosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(articulos_desayuno_entity_1.ArticuloDesayuno)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ArticulosService);
//# sourceMappingURL=articulos.service.js.map