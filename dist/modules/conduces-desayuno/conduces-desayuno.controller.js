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
exports.ConducesDesayunoController = void 0;
const common_1 = require("@nestjs/common");
const conduces_desayuno_service_1 = require("./conduces-desayuno.service");
const auth_middleware_1 = require("../../common/middleware/auth.middleware");
const service_response_1 = require("../../helpers/service-response");
const conduce_desayuno_create_dto_1 = require("../../dtos/conduce-desayuno-create.dto");
let ConducesDesayunoController = class ConducesDesayunoController {
    service;
    constructor(service) {
        this.service = service;
    }
    async findOne(request, response) {
        const res = await this.service.getSiguienteCodigo(request.claims.company);
        return response.status(res.code).send(res);
    }
    async createBulk(dtos, request, response) {
        const res = await this.service.createBulk(dtos, request.claims.company);
        return response.status(res.code).send(res);
    }
    async getPorFecha(request, desde, hasta, escuelaId = '0') {
        return this.service.findByFechaRango(request.claims.company, desde, hasta, Number(escuelaId));
    }
    async getPorFechaDeleted(request, desde, hasta, escuelaId = '0') {
        return this.service.findByFechaRangoDeleted(request.claims.company, desde, hasta, Number(escuelaId));
    }
    async softDelete(request, id) {
        return this.service.softDelete(Number(id), request.claims.company);
    }
    async softDeleteBulk(ids, request, response) {
        const res = await this.service.softDeleteBulk(ids, request.claims.company);
        return response.status(res.code).send(res);
    }
    async restore(ids, response) {
        const res = await this.service.restoreConduces(ids);
        return response.status(res.code).send(res);
    }
    async getData(request, response) {
        const res = await this.service.getUltimasFechasConTotales(request.claims.company);
        return response.status(res.code).send(res);
    }
    async findByCodigo(codigo, deleted, request, response) {
        const res = await this.service.findByCodigo(Number(codigo), Number(request.claims.company), deleted === 'true');
        return response.status(res.code).send(res);
    }
    async getRelacion(request, response, desde, hasta, escuelaId = '0') {
        const res = await this.service.getRelacionPivot(Number(request.claims.company), String(desde), hasta ? String(hasta) : undefined, Number(escuelaId));
        return response.status(res.code).send(res);
    }
    async updateRacionesActuales(body, request, response) {
        const ids = body?.ids || [];
        const escuelaId = body?.escuelaId ?? body?.schoolId;
        if (!escuelaId) {
            return response.status(400).send(new service_response_1.ServiceResponse(400, null, 'escuelaId es requerido en el body (escuelaId o schoolId).'));
        }
        const res = await this.service.updateConducesCantidadByEscuela(Number(escuelaId), Number(request.claims.company), ids);
        return response.status(res.code).send(res);
    }
};
exports.ConducesDesayunoController = ConducesDesayunoController;
__decorate([
    (0, common_1.Get)('next'),
    (0, common_1.UseGuards)(auth_middleware_1.AuthMiddleware),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ConducesDesayunoController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('bulk'),
    (0, common_1.UseGuards)(auth_middleware_1.AuthMiddleware),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, transform: true })),
    __param(0, (0, common_1.Body)(new common_1.ParseArrayPipe({ items: conduce_desayuno_create_dto_1.CreateConduceDto, whitelist: true }))),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object, Object]),
    __metadata("design:returntype", Promise)
], ConducesDesayunoController.prototype, "createBulk", null);
__decorate([
    (0, common_1.Get)('by-date'),
    (0, common_1.UseGuards)(auth_middleware_1.AuthMiddleware),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('from')),
    __param(2, (0, common_1.Query)('to')),
    __param(3, (0, common_1.Query)('schoolId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", Promise)
], ConducesDesayunoController.prototype, "getPorFecha", null);
__decorate([
    (0, common_1.Get)('deleted/by-date'),
    (0, common_1.UseGuards)(auth_middleware_1.AuthMiddleware),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('from')),
    __param(2, (0, common_1.Query)('to')),
    __param(3, (0, common_1.Query)('schoolId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", Promise)
], ConducesDesayunoController.prototype, "getPorFechaDeleted", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    (0, common_1.UseGuards)(auth_middleware_1.AuthMiddleware),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ConducesDesayunoController.prototype, "softDelete", null);
__decorate([
    (0, common_1.Post)('bulk-delete'),
    (0, common_1.UseGuards)(auth_middleware_1.AuthMiddleware),
    __param(0, (0, common_1.Body)('ids')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object, Object]),
    __metadata("design:returntype", Promise)
], ConducesDesayunoController.prototype, "softDeleteBulk", null);
__decorate([
    (0, common_1.Post)('restore'),
    (0, common_1.UseGuards)(auth_middleware_1.AuthMiddleware),
    __param(0, (0, common_1.Body)('ids')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
    __metadata("design:returntype", Promise)
], ConducesDesayunoController.prototype, "restore", null);
__decorate([
    (0, common_1.Get)('data'),
    (0, common_1.UseGuards)(auth_middleware_1.AuthMiddleware),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ConducesDesayunoController.prototype, "getData", null);
__decorate([
    (0, common_1.Get)('by-codigo'),
    (0, common_1.UseGuards)(auth_middleware_1.AuthMiddleware),
    __param(0, (0, common_1.Query)('codigo')),
    __param(1, (0, common_1.Query)('deleted')),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, Object]),
    __metadata("design:returntype", Promise)
], ConducesDesayunoController.prototype, "findByCodigo", null);
__decorate([
    (0, common_1.Get)('relacion'),
    (0, common_1.UseGuards)(auth_middleware_1.AuthMiddleware),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Query)('from')),
    __param(3, (0, common_1.Query)('to')),
    __param(4, (0, common_1.Query)('schoolId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, String, String]),
    __metadata("design:returntype", Promise)
], ConducesDesayunoController.prototype, "getRelacion", null);
__decorate([
    (0, common_1.Post)('update-raciones-actuales'),
    (0, common_1.UseGuards)(auth_middleware_1.AuthMiddleware),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ConducesDesayunoController.prototype, "updateRacionesActuales", null);
exports.ConducesDesayunoController = ConducesDesayunoController = __decorate([
    (0, common_1.Controller)('conduces-desayuno'),
    __metadata("design:paramtypes", [conduces_desayuno_service_1.ConduceDesayunoService])
], ConducesDesayunoController);
//# sourceMappingURL=conduces-desayuno.controller.js.map