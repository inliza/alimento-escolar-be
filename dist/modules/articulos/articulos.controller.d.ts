import { ArticulosService } from "./articulos.service";
export declare class ArticulosController {
    private readonly service;
    constructor(service: ArticulosService);
    findAll(request: any, response: any): Promise<any>;
    findOne(id: number, response: any): Promise<any>;
    updatePrice(id: number, body: {
        precio: number | string;
    }, response: any): Promise<any>;
}
