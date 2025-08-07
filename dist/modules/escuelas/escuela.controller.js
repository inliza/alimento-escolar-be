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
let EscuelasController = class EscuelasController {
    escuelasService;
    constructor(escuelasService) {
        this.escuelasService = escuelasService;
    }
    create(createEscuelaDto) {
        return this.escuelasService.create(createEscuelaDto);
    }
    findAll() {
        return this.escuelasService.findAll();
    }
    findOne(id) {
        return this.escuelasService.findOne(id);
    }
    update(id, updateEscuelaDto) {
        return this.escuelasService.update(id, updateEscuelaDto);
    }
    remove(id) {
        return this.escuelasService.remove(id);
    }
};
exports.EscuelasController = EscuelasController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [escuela_create_dto_1.CreateEscuelaDto]),
    __metadata("design:returntype", void 0)
], EscuelasController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EscuelasController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], EscuelasController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, escuela_update_dto_1.UpdateEscuelaDto]),
    __metadata("design:returntype", void 0)
], EscuelasController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], EscuelasController.prototype, "remove", null);
exports.EscuelasController = EscuelasController = __decorate([
    (0, common_1.Controller)('escuelas'),
    __metadata("design:paramtypes", [escuela_service_1.EscuelasService])
], EscuelasController);
//# sourceMappingURL=escuela.controller.js.map