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
exports.ArticulosController = void 0;
const common_1 = require("@nestjs/common");
const articulos_service_1 = require("./articulos.service");
const auth_middleware_1 = require("../../common/middleware/auth.middleware");
let ArticulosController = class ArticulosController {
    service;
    constructor(service) {
        this.service = service;
    }
    async findAll(request, response) {
        const res = await this.service.findAll();
        return response.status(res.code).send(res);
    }
    async findOne(id, response) {
        const res = await this.service.findById(id);
        return response.status(res.code).send(res);
    }
};
exports.ArticulosController = ArticulosController;
__decorate([
    (0, common_1.Get)('desayuno'),
    (0, common_1.UseGuards)(auth_middleware_1.AuthMiddleware),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ArticulosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('desayuno/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ArticulosController.prototype, "findOne", null);
exports.ArticulosController = ArticulosController = __decorate([
    (0, common_1.Controller)('articulos'),
    __metadata("design:paramtypes", [articulos_service_1.ArticulosService])
], ArticulosController);
//# sourceMappingURL=articulos.controller.js.map