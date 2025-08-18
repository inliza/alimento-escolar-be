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
exports.EscuelasController = void 0;
const common_1 = require("@nestjs/common");
const escuela_service_1 = require("./escuela.service");
const escuela_create_dto_1 = require("../../dtos/escuela-create.dto");
const escuela_update_dto_1 = require("../../dtos/escuela-update.dto");
const auth_middleware_1 = require("../../common/middleware/auth.middleware");
let EscuelasController = class EscuelasController {
    escuelasService;
    constructor(escuelasService) {
        this.escuelasService = escuelasService;
    }
    create(request, createEscuelaDto) {
        return this.escuelasService.create(createEscuelaDto, request.claims.company);
    }
    async findAll(request, response) {
        const res = await this.escuelasService.findAll(request.claims.company);
        return response.status(res.code).send(res);
    }
    async findProvinces(response) {
        const res = await this.escuelasService.findAllProvince();
        return response.status(res.code).send(res);
    }
    async findDistritos(id, response) {
        const res = await this.escuelasService.findAllDistritos(id);
        return response.status(res.code).send(res);
    }
    async findLocalidades(id, response) {
        const res = await this.escuelasService.findAllLocalidades(id);
        return response.status(res.code).send(res);
    }
    async findOne(id, response) {
        const res = await this.escuelasService.findById(id);
        return response.status(res.code).send(res);
    }
    async remove(id, response, request) {
        const res = await this.escuelasService.remove(id, request.claims.company);
        return response.status(res.code).send(res);
    }
    async update(id, request, response, updateEscuelaDto) {
        const res = await this.escuelasService.update(id, updateEscuelaDto, request.claims.company);
        return response.status(res.code).send(res);
    }
};
exports.EscuelasController = EscuelasController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(auth_middleware_1.AuthMiddleware),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, escuela_create_dto_1.CreateEscuelaDto]),
    __metadata("design:returntype", void 0)
], EscuelasController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(auth_middleware_1.AuthMiddleware),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EscuelasController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('provincias'),
    (0, common_1.UseGuards)(auth_middleware_1.AuthMiddleware),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EscuelasController.prototype, "findProvinces", null);
__decorate([
    (0, common_1.Get)('distritos-by-province/:id'),
    (0, common_1.UseGuards)(auth_middleware_1.AuthMiddleware),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], EscuelasController.prototype, "findDistritos", null);
__decorate([
    (0, common_1.Get)('localidades-by-province/:id'),
    (0, common_1.UseGuards)(auth_middleware_1.AuthMiddleware),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], EscuelasController.prototype, "findLocalidades", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], EscuelasController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(auth_middleware_1.AuthMiddleware),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], EscuelasController.prototype, "remove", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(auth_middleware_1.AuthMiddleware),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object, escuela_update_dto_1.UpdateEscuelaDto]),
    __metadata("design:returntype", Promise)
], EscuelasController.prototype, "update", null);
exports.EscuelasController = EscuelasController = __decorate([
    (0, common_1.Controller)('escuelas'),
    __metadata("design:paramtypes", [escuela_service_1.EscuelasService])
], EscuelasController);
//# sourceMappingURL=escuela.controller.js.map