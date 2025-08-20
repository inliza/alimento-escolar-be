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
exports.MenuDesayuno = void 0;
const typeorm_1 = require("typeorm");
const articulos_desayuno_entity_1 = require("./articulos-desayuno.entity");
const dias_disponibles_entity_1 = require("./dias-disponibles.entity");
const company_entity_1 = require("./company.entity");
let MenuDesayuno = class MenuDesayuno {
    id;
    descripcion;
    companyId;
    diaId;
    articuloId;
    articulo;
    dia;
    company;
};
exports.MenuDesayuno = MenuDesayuno;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], MenuDesayuno.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], MenuDesayuno.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'companyid' }),
    __metadata("design:type", Number)
], MenuDesayuno.prototype, "companyId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'diaid' }),
    __metadata("design:type", Number)
], MenuDesayuno.prototype, "diaId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'articuloid' }),
    __metadata("design:type", Number)
], MenuDesayuno.prototype, "articuloId", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.ManyToOne)(() => articulos_desayuno_entity_1.ArticuloDesayuno, (a) => a.menus, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'articuloid' }),
    __metadata("design:type", articulos_desayuno_entity_1.ArticuloDesayuno)
], MenuDesayuno.prototype, "articulo", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.ManyToOne)(() => dias_disponibles_entity_1.DiaDisponibleMes, (d) => d.menus, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'diaid' }),
    __metadata("design:type", dias_disponibles_entity_1.DiaDisponibleMes)
], MenuDesayuno.prototype, "dia", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.ManyToOne)(() => company_entity_1.Company, (c) => c.breakfastMenus, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'companyid' }),
    __metadata("design:type", company_entity_1.Company)
], MenuDesayuno.prototype, "company", void 0);
exports.MenuDesayuno = MenuDesayuno = __decorate([
    (0, typeorm_1.Entity)({ name: 'menu_desayuno' }),
    (0, typeorm_1.Unique)('UQ_menu_por_dia_articulo_company', ['dia', 'articulo', 'company'])
], MenuDesayuno);
//# sourceMappingURL=menu-desayuno.entity.js.map