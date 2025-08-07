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
exports.Escuela = void 0;
const typeorm_1 = require("typeorm");
const localidad_entity_1 = require("./localidad.entity");
const distrito_entity_1 = require("./distrito.entity");
const company_entity_1 = require("./company.entity");
let Escuela = class Escuela {
    id;
    nombre;
    direccion;
    telefono;
    director;
    codigoEscuela;
    racion;
    tipoEscuela;
    deleted;
    prepara;
    prepara_Day;
    localidad;
    distrito;
    company;
};
exports.Escuela = Escuela;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Escuela.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 70 }),
    __metadata("design:type", String)
], Escuela.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Escuela.prototype, "direccion", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 12, nullable: true }),
    __metadata("design:type", String)
], Escuela.prototype, "telefono", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], Escuela.prototype, "director", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], Escuela.prototype, "codigoEscuela", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], Escuela.prototype, "racion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'char', length: 1, nullable: true }),
    __metadata("design:type", String)
], Escuela.prototype, "tipoEscuela", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', nullable: true }),
    __metadata("design:type", Boolean)
], Escuela.prototype, "deleted", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', nullable: true }),
    __metadata("design:type", Boolean)
], Escuela.prototype, "prepara", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: true }),
    __metadata("design:type", String)
], Escuela.prototype, "prepara_Day", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => localidad_entity_1.Localidad, localidad => localidad.escuelas),
    __metadata("design:type", localidad_entity_1.Localidad)
], Escuela.prototype, "localidad", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => distrito_entity_1.Distrito, distrito => distrito.escuelas),
    __metadata("design:type", distrito_entity_1.Distrito)
], Escuela.prototype, "distrito", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => company_entity_1.Company, company => company.escuelas, { nullable: true }),
    __metadata("design:type", company_entity_1.Company)
], Escuela.prototype, "company", void 0);
exports.Escuela = Escuela = __decorate([
    (0, typeorm_1.Entity)('Escuelas')
], Escuela);
//# sourceMappingURL=escuela.entity.js.map