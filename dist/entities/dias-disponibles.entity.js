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
exports.DiaDisponibleMes = exports.DayOfWeek = void 0;
const typeorm_1 = require("typeorm");
const menu_desayuno_entity_1 = require("./menu-desayuno.entity");
var DayOfWeek;
(function (DayOfWeek) {
    DayOfWeek[DayOfWeek["Lunes"] = 1] = "Lunes";
    DayOfWeek[DayOfWeek["Martes"] = 2] = "Martes";
    DayOfWeek[DayOfWeek["Miercoles"] = 3] = "Miercoles";
    DayOfWeek[DayOfWeek["Jueves"] = 4] = "Jueves";
    DayOfWeek[DayOfWeek["Viernes"] = 5] = "Viernes";
    DayOfWeek[DayOfWeek["Sabado"] = 6] = "Sabado";
    DayOfWeek[DayOfWeek["Domingo"] = 7] = "Domingo";
})(DayOfWeek || (exports.DayOfWeek = DayOfWeek = {}));
let DiaDisponibleMes = class DiaDisponibleMes {
    id;
    name;
    dayOfTheWeek;
    orderInMonth;
    menus;
};
exports.DiaDisponibleMes = DiaDisponibleMes;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], DiaDisponibleMes.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], DiaDisponibleMes.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: 'int', name: 'dayoftheweek' }),
    __metadata("design:type", Number)
], DiaDisponibleMes.prototype, "dayOfTheWeek", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: 'int', name: 'orderinmonth' }),
    __metadata("design:type", Number)
], DiaDisponibleMes.prototype, "orderInMonth", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => menu_desayuno_entity_1.MenuDesayuno, (menu) => menu.dia, { cascade: false }),
    __metadata("design:type", Array)
], DiaDisponibleMes.prototype, "menus", void 0);
exports.DiaDisponibleMes = DiaDisponibleMes = __decorate([
    (0, typeorm_1.Entity)({ name: 'dias_disponibles_mes' }),
    (0, typeorm_1.Check)(`"dayOfTheWeek" BETWEEN 1 AND 7`),
    (0, typeorm_1.Check)(`"orderInMonth" BETWEEN 1 AND 5`)
], DiaDisponibleMes);
//# sourceMappingURL=dias-disponibles.entity.js.map