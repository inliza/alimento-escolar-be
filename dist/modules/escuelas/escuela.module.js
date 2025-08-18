"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EscuelasModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const escuela_entity_1 = require("../../entities/escuela.entity");
const escuela_controller_1 = require("./escuela.controller");
const escuela_service_1 = require("./escuela.service");
const common_module_1 = require("../../common/common.module");
const localidad_entity_1 = require("../../entities/localidad.entity");
const provincia_entity_1 = require("../../entities/provincia.entity");
const distrito_entity_1 = require("../../entities/distrito.entity");
let EscuelasModule = class EscuelasModule {
};
exports.EscuelasModule = EscuelasModule;
exports.EscuelasModule = EscuelasModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([escuela_entity_1.Escuela, localidad_entity_1.Localidad, provincia_entity_1.Provincia, distrito_entity_1.Distrito]), common_module_1.CommonModule],
        controllers: [escuela_controller_1.EscuelasController],
        providers: [escuela_service_1.EscuelasService],
    })
], EscuelasModule);
//# sourceMappingURL=escuela.module.js.map