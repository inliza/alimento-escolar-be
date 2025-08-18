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
exports.Distrito = void 0;
const typeorm_1 = require("typeorm");
const provincia_entity_1 = require("./provincia.entity");
const escuela_entity_1 = require("./escuela.entity");
let Distrito = class Distrito {
    id;
    nombre;
    numero;
    idprovincia;
    provincia;
    escuelas;
};
exports.Distrito = Distrito;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Distrito.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], Distrito.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 4 }),
    __metadata("design:type", String)
], Distrito.prototype, "numero", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'idprovincia' }),
    __metadata("design:type", Number)
], Distrito.prototype, "idprovincia", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => provincia_entity_1.Provincia, provincia => provincia.localidades),
    (0, typeorm_1.JoinColumn)({ name: 'idprovincia' }),
    __metadata("design:type", provincia_entity_1.Provincia)
], Distrito.prototype, "provincia", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => escuela_entity_1.Escuela, escuela => escuela.distrito),
    __metadata("design:type", Array)
], Distrito.prototype, "escuelas", void 0);
exports.Distrito = Distrito = __decorate([
    (0, typeorm_1.Entity)('distritos')
], Distrito);
//# sourceMappingURL=distrito.entity.js.map