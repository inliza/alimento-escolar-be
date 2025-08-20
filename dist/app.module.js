"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const common_module_1 = require("./common/common.module");
const config_1 = require("@nestjs/config");
const company_module_1 = require("./modules/company/company.module");
const profiles_module_1 = require("./modules/profiles/profiles.module");
const users_module_1 = require("./modules/users/users.module");
const escuela_module_1 = require("./modules/escuelas/escuela.module");
const articulos_module_1 = require("./modules/articulos/articulos.module");
const menu_module_1 = require("./modules/menu/menu.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [common_module_1.CommonModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env'
            }),
            company_module_1.CompanyModule,
            profiles_module_1.ProfilesModule,
            users_module_1.UsersModule,
            escuela_module_1.EscuelasModule,
            articulos_module_1.ArticulosModule,
            menu_module_1.MenuModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map