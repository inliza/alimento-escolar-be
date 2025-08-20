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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const dias_disponibles_entity_1 = require("../../entities/dias-disponibles.entity");
const menu_desayuno_entity_1 = require("../../entities/menu-desayuno.entity");
const service_response_1 = require("../../helpers/service-response");
const typeorm_2 = require("typeorm");
let MenuService = class MenuService {
    diasDisponiblesRepo;
    menuDesayunoRepo;
    constructor(diasDisponiblesRepo, menuDesayunoRepo) {
        this.diasDisponiblesRepo = diasDisponiblesRepo;
        this.menuDesayunoRepo = menuDesayunoRepo;
    }
    async findAllDaysAvailable(companyId) {
        try {
            const dias = await this.diasDisponiblesRepo
                .createQueryBuilder('d')
                .leftJoin(menu_desayuno_entity_1.MenuDesayuno, 'm', 'm.diaId = d.id AND m.companyId = :companyId', { companyId })
                .where('m.id IS NULL')
                .orderBy('d.dayOfTheWeek', 'ASC')
                .addOrderBy('d.orderInMonth', 'ASC')
                .getMany();
            return new service_response_1.ServiceResponse(200, dias);
        }
        catch (error) {
            return new service_response_1.ServiceResponse(500, null, 'Error fetching available days', error);
        }
    }
    async findAllMenu(companyId) {
        try {
            const menu = await this.menuDesayunoRepo.find({
                where: { companyId },
                relations: ['dia', 'articulo'],
                order: {
                    dia: { dayOfTheWeek: 'ASC', orderInMonth: 'ASC' },
                },
            });
            return new service_response_1.ServiceResponse(200, menu);
        }
        catch (error) {
            return new service_response_1.ServiceResponse(500, null, 'Error fetching menu', error);
        }
    }
    async findOne(id) {
        const articulo = await this.diasDisponiblesRepo.findOne({ where: { id } });
        if (!articulo) {
            return null;
        }
        return articulo;
    }
    async remove(id) {
        const articulo = await this.diasDisponiblesRepo.findOne({ where: { id } });
        if (!articulo) {
            return new service_response_1.ServiceResponse(404, `Article with ID ${id} not found`);
        }
        await this.diasDisponiblesRepo.save(articulo);
        return new service_response_1.ServiceResponse(200, 'Article removed successfully');
    }
    async create(menu, idCompany) {
        try {
            const articulo = new menu_desayuno_entity_1.MenuDesayuno();
            articulo.companyId = idCompany;
            articulo.diaId = menu.diaId;
            articulo.articuloId = menu.articuloId;
            await this.menuDesayunoRepo.save(articulo);
            return new service_response_1.ServiceResponse(201, articulo, 'Menu created successfully');
        }
        catch (error) {
            return new service_response_1.ServiceResponse(500, null, 'Error creating menu', error);
        }
    }
};
exports.MenuService = MenuService;
exports.MenuService = MenuService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(dias_disponibles_entity_1.DiaDisponibleMes)),
    __param(1, (0, typeorm_1.InjectRepository)(menu_desayuno_entity_1.MenuDesayuno)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], MenuService);
//# sourceMappingURL=menu.service.js.map