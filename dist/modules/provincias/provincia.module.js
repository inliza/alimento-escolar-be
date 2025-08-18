"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProvinciasModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const provincia_entity_1 = require("../../entities/provincia.entity");
const provincia_service_1 = require("./provincia.service");
let ProvinciasModule = class ProvinciasModule {
};
exports.ProvinciasModule = ProvinciasModule;
exports.ProvinciasModule = ProvinciasModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([provincia_entity_1.Provincia])],
        providers: [provincia_service_1.ProvinciasService],
    })
], ProvinciasModule);
//# sourceMappingURL=provincia.module.js.map