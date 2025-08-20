import { CreateMenuDto } from "src/dtos/menu-create.dto";
import { DiaDisponibleMes } from "src/entities/dias-disponibles.entity";
import { MenuDesayuno } from "src/entities/menu-desayuno.entity";
import { ServiceResponse } from "src/helpers/service-response";
import { Repository } from "typeorm";
export declare class MenuService {
    private readonly diasDisponiblesRepo;
    private readonly menuDesayunoRepo;
    constructor(diasDisponiblesRepo: Repository<DiaDisponibleMes>, menuDesayunoRepo: Repository<MenuDesayuno>);
    findAllDaysAvailable(companyId: number): Promise<ServiceResponse<DiaDisponibleMes[] | null>>;
    findAllMenu(companyId: number): Promise<ServiceResponse<MenuDesayuno[] | null>>;
    findOne(id: number): Promise<DiaDisponibleMes | null>;
    remove(id: number): Promise<ServiceResponse<string>>;
    create(menu: CreateMenuDto, idCompany: number): Promise<ServiceResponse<MenuDesayuno | null>>;
}
