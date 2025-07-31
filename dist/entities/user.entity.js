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
exports.Users = void 0;
const typeorm_1 = require("typeorm");
const company_entity_1 = require("./company.entity");
const profile_entity_1 = require("./profile.entity");
let Users = class Users {
    id;
    company;
    firstName;
    lastName;
    username;
    password;
    profile;
    isActive;
    isDeleted;
    createDt;
    createdBy;
};
exports.Users = Users;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Users.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => company_entity_1.Company, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'idcompany' }),
    __metadata("design:type", company_entity_1.Company)
], Users.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'firstname' }),
    __metadata("design:type", String)
], Users.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'lastname' }),
    __metadata("design:type", String)
], Users.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Users.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Users.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => profile_entity_1.Profiles, { nullable: true, onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'idprofile' }),
    __metadata("design:type", profile_entity_1.Profiles)
], Users.prototype, "profile", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'isactive', default: true }),
    __metadata("design:type", Boolean)
], Users.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'isdeleted', default: false }),
    __metadata("design:type", Boolean)
], Users.prototype, "isDeleted", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'create_dt', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Users.prototype, "createDt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'createdby', nullable: true }),
    __metadata("design:type", String)
], Users.prototype, "createdBy", void 0);
exports.Users = Users = __decorate([
    (0, typeorm_1.Entity)('users')
], Users);
//# sourceMappingURL=user.entity.js.map