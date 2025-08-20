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
exports.MenuController = void 0;
const common_1 = require("@nestjs/common");
const menu_service_1 = require("./menu.service");
const auth_middleware_1 = require("../../common/middleware/auth.middleware");
const menu_create_dto_1 = require("../../dtos/menu-create.dto");
let MenuController = class MenuController {
    service;
    constructor(service) {
        this.service = service;
    }
    async findAll(request, response) {
        const res = await this.service.findAllDaysAvailable(request.claims.company);
        return response.status(res.code).send(res);
    }
    async findAllMenu(request, response) {
        const res = await this.service.findAllMenu(request.claims.company);
        return response.status(res.code).send(res);
    }
    create(request, createMenuDto) {
        return this.service.create(createMenuDto, request.claims.company);
    }
};
exports.MenuController = MenuController;
__decorate([
    (0, common_1.Get)('dias-disponibles'),
    (0, common_1.UseGuards)(auth_middleware_1.AuthMiddleware),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(''),
    (0, common_1.UseGuards)(auth_middleware_1.AuthMiddleware),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "findAllMenu", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(auth_middleware_1.AuthMiddleware),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, menu_create_dto_1.CreateMenuDto]),
    __metadata("design:returntype", void 0)
], MenuController.prototype, "create", null);
exports.MenuController = MenuController = __decorate([
    (0, common_1.Controller)('menu'),
    __metadata("design:paramtypes", [menu_service_1.MenuService])
], MenuController);
//# sourceMappingURL=menu.controller.js.map