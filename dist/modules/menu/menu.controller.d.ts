import { MenuService } from "./menu.service";
import { CreateMenuDto } from "src/dtos/menu-create.dto";
export declare class MenuController {
    private readonly service;
    constructor(service: MenuService);
    findAll(request: any, response: any): Promise<any>;
    findAllMenu(request: any, response: any): Promise<any>;
    create(request: any, createMenuDto: CreateMenuDto): Promise<import("../../helpers/service-response").ServiceResponse<import("../../entities/menu-desayuno.entity").MenuDesayuno | null>>;
}
