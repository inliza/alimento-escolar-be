import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ArticuloDesayuno } from "src/entities/articulos-desayuno.entity";
import { ServiceResponse } from "src/helpers/service-response";
import { Repository } from "typeorm";

@Injectable()
export class ArticulosService {
    constructor(
        @InjectRepository(ArticuloDesayuno)
        private readonly articulosD: Repository<ArticuloDesayuno>,
    ) { }


    async findAll(): Promise<ServiceResponse<ArticuloDesayuno[] | null>> {

        try {
            const articulos = await this.articulosD.find();
            return new ServiceResponse(200, articulos);
        } catch (error) {
            return new ServiceResponse(500, null, 'Error fetching articles', error);
        }
    }

    async findById(id: number): Promise<ServiceResponse<ArticuloDesayuno | null>> {
        const articulo = await this.articulosD.findOne({ where: { id } });
        if (!articulo) {
            return new ServiceResponse(404, null, `Article with ID ${id} not found`);
        }
        return new ServiceResponse(200, articulo);
    }

    async updatePrice(id: number, precio: number | string): Promise<ServiceResponse<ArticuloDesayuno | null>> {
        const articulo = await this.articulosD.findOne({ where: { id } });

        if (!articulo) {
            return new ServiceResponse(404, null, `Article with ID ${id} not found`);
        }

        const precioNumerico = Number(precio);

        if (Number.isNaN(precioNumerico)) {
            return new ServiceResponse(400, null, 'The article price is invalid');
        }

        articulo.precio = precioNumerico.toFixed(2);
        const updatedArticulo = await this.articulosD.save(articulo);

        return new ServiceResponse(200, updatedArticulo, 'Article price updated successfully');
    }

    private async findOne(id: number): Promise<ArticuloDesayuno | null> {
        const articulo = await this.articulosD.findOne({ where: { id } });
        if (!articulo) {
            return null;
        }
        return articulo;
    }

    async remove(id: number): Promise<ServiceResponse<string>> {

        const articulo = await this.articulosD.findOne({ where: { id } });

        if (!articulo) {
            return new ServiceResponse(404, `Article with ID ${id} not found`);
        }
        articulo.isDeleted = true;
        await this.articulosD.save(articulo);

        return new ServiceResponse(200, 'Article removed successfully');
    }

    async create(articulo: ArticuloDesayuno): Promise<ArticuloDesayuno> {
        const newArticulo = this.articulosD.create(articulo);
        return this.articulosD.save(newArticulo);
    }

}