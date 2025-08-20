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
exports.ArticuloDesayuno = void 0;
const typeorm_1 = require("typeorm");
const menu_desayuno_entity_1 = require("./menu-desayuno.entity");
let ArticuloDesayuno = class ArticuloDesayuno {
    id;
    nombre;
    precio;
    itbis;
    isDeleted;
    menus;
};
exports.ArticuloDesayuno = ArticuloDesayuno;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ArticuloDesayuno.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], ArticuloDesayuno.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 10, scale: 2 }),
    __metadata("design:type", String)
], ArticuloDesayuno.prototype, "precio", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], ArticuloDesayuno.prototype, "itbis", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'isdeleted', default: false }),
    __metadata("design:type", Boolean)
], ArticuloDesayuno.prototype, "isDeleted", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => menu_desayuno_entity_1.MenuDesayuno, (menu) => menu.articulo, { cascade: false }),
    __metadata("design:type", Array)
], ArticuloDesayuno.prototype, "menus", void 0);
exports.ArticuloDesayuno = ArticuloDesayuno = __decorate([
    (0, typeorm_1.Entity)({ name: 'articulos_desayuno' })
], ArticuloDesayuno);
//# sourceMappingURL=articulos-desayuno.entity.js.map