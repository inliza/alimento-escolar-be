import { ArticuloDesayuno } from "src/entities/articulos-desayuno.entity";
import { ServiceResponse } from "src/helpers/service-response";
import { Repository } from "typeorm";
export declare class ArticulosService {
    private readonly articulosD;
    constructor(articulosD: Repository<ArticuloDesayuno>);
    findAll(): Promise<ServiceResponse<ArticuloDesayuno[] | null>>;
    findById(id: number): Promise<ServiceResponse<ArticuloDesayuno | null>>;
    private findOne;
    remove(id: number): Promise<ServiceResponse<string>>;
    create(articulo: ArticuloDesayuno): Promise<ArticuloDesayuno>;
}
