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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConduceDesayuno = void 0;
const articulos_desayuno_entity_1 = require("./articulos-desayuno.entity");
const company_entity_1 = require("./company.entity");
const escuela_entity_1 = require("./escuela.entity");
const typeorm_1 = require("typeorm");
let ConduceDesayuno = class ConduceDesayuno {
    id;
    codigoConduce;
    escuelaId;
    articuloId;
    cantidad;
    precio;
    total;
    itbis;
    fechaEntrega;
    companyId;
    deleted;
    articulo;
    company;
    escuela;
};
exports.ConduceDesayuno = ConduceDesayuno;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ConduceDesayuno.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'codigo_conduce', type: 'int' }),
    __metadata("design:type", Number)
], ConduceDesayuno.prototype, "codigoConduce", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'escuelaid', type: 'int' }),
    __metadata("design:type", Number)
], ConduceDesayuno.prototype, "escuelaId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'articuloid', type: 'int' }),
    __metadata("design:type", Number)
], ConduceDesayuno.prototype, "articuloId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], ConduceDesayuno.prototype, "cantidad", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], ConduceDesayuno.prototype, "precio", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], ConduceDesayuno.prototype, "total", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 12, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], ConduceDesayuno.prototype, "itbis", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_entrega', type: 'date' }),
    __metadata("design:type", Date)
], ConduceDesayuno.prototype, "fechaEntrega", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'companyid', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], ConduceDesayuno.prototype, "companyId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], ConduceDesayuno.prototype, "deleted", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => articulos_desayuno_entity_1.ArticuloDesayuno, (articulo) => articulo.conduces, {
        eager: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'articuloid' }),
    __metadata("design:type", articulos_desayuno_entity_1.ArticuloDesayuno)
], ConduceDesayuno.prototype, "articulo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => company_entity_1.Company, (company) => company.conduces, {
        eager: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'companyid' }),
    __metadata("design:type", company_entity_1.Company)
], ConduceDesayuno.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => escuela_entity_1.Escuela, (escuela) => escuela.conduces, {
        eager: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'escuelaid' }),
    __metadata("design:type", escuela_entity_1.Escuela)
], ConduceDesayuno.prototype, "escuela", void 0);
exports.ConduceDesayuno = ConduceDesayuno = __decorate([
    (0, typeorm_1.Entity)('conduces_desayuno')
], ConduceDesayuno);
//# sourceMappingURL=conduces-desayuno.entity.js.map