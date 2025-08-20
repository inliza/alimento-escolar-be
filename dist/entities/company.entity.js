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
exports.Company = void 0;
const typeorm_1 = require("typeorm");
const escuela_entity_1 = require("./escuela.entity");
const menu_desayuno_entity_1 = require("./menu-desayuno.entity");
let Company = class Company {
    id;
    name;
    phone;
    alias;
    address;
    rnc;
    owner;
    isActive;
    isDeleted;
    createDt;
    escuelas;
    breakfastMenus;
};
exports.Company = Company;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Company.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Company.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Company.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Company.prototype, "alias", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Company.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Company.prototype, "rnc", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Company.prototype, "owner", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'isactive', default: true }),
    __metadata("design:type", Boolean)
], Company.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'isdeleted', default: false }),
    __metadata("design:type", Boolean)
], Company.prototype, "isDeleted", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'create_dt', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Company.prototype, "createDt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => escuela_entity_1.Escuela, escuela => escuela.company),
    __metadata("design:type", Array)
], Company.prototype, "escuelas", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => menu_desayuno_entity_1.MenuDesayuno, (m) => m.company),
    __metadata("design:type", Array)
], Company.prototype, "breakfastMenus", void 0);
exports.Company = Company = __decorate([
    (0, typeorm_1.Entity)('company')
], Company);
//# sourceMappingURL=company.entity.js.map