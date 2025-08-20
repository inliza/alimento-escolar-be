import { ArticulosService } from "./articulos.service";
export declare class ArticulosController {
    private readonly service;
    constructor(service: ArticulosService);
    findAll(request: any, response: any): Promise<any>;
    findOne(id: number, response: any): Promise<any>;
}
