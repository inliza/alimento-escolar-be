import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateMenuDto } from "src/dtos/menu-create.dto";
import { ArticuloDesayuno } from "src/entities/articulos-desayuno.entity";
import { DiaDisponibleMes } from "src/entities/dias-disponibles.entity";
import { MenuDesayuno } from "src/entities/menu-desayuno.entity";
import { ServiceResponse } from "src/helpers/service-response";
import { Repository } from "typeorm";

@Injectable()
export class MenuService {
    constructor(
        @InjectRepository(DiaDisponibleMes)
        private readonly diasDisponiblesRepo: Repository<DiaDisponibleMes>,

        @InjectRepository(MenuDesayuno)
        private readonly menuDesayunoRepo: Repository<MenuDesayuno>,
    ) { }

    async findAllDaysAvailable(companyId: number): Promise<ServiceResponse<DiaDisponibleMes[] | null>> {
        try {
            const dias = await this.diasDisponiblesRepo
                .createQueryBuilder('d')
                .leftJoin(
                    MenuDesayuno,
                    'm',
                    'm.diaId = d.id AND m.companyId = :companyId',
                    { companyId },
                )
                .where('m.id IS NULL')
                .orderBy('d.dayOfTheWeek', 'ASC')
                .addOrderBy('d.orderInMonth', 'ASC')
                .getMany();

            return new ServiceResponse(200, dias);
        } catch (error) {
            return new ServiceResponse(500, null, 'Error fetching available days', error);
        }
    }
    async findAllMenu(companyId: number): Promise<ServiceResponse<MenuDesayuno[] | null>> {
        try {
            const menu = await this.menuDesayunoRepo.find({
                where: { companyId },
                relations: ['dia', 'articulo'],
                order: {
                    dia: { dayOfTheWeek: 'ASC', orderInMonth: 'ASC' }, // si tu DiaDisponibleMes tiene estos campos
                },
            });

            return new ServiceResponse(200, menu);
        } catch (error) {
            return new ServiceResponse(500, null, 'Error fetching menu', error);
        }
    }

    async findOne(id: number): Promise<DiaDisponibleMes | null> {

        const articulo = await this.diasDisponiblesRepo.findOne({ where: { id } });
        if (!articulo) {
            return null;
        }
        return articulo;

    }

    async remove(id: number): Promise<ServiceResponse<string>> {

        const articulo = await this.diasDisponiblesRepo.findOne({ where: { id } });

        if (!articulo) {
            return new ServiceResponse(404, `Article with ID ${id} not found`);
        }
        // articulo.isDeleted = true;
        await this.diasDisponiblesRepo.save(articulo);

        return new ServiceResponse(200, 'Article removed successfully');
    }

    async create(menu: CreateMenuDto, idCompany: number): Promise<ServiceResponse<MenuDesayuno | null>> {

        try {
            const articulo = new MenuDesayuno();
            articulo.companyId = idCompany;
            articulo.diaId = menu.diaId;
            articulo.articuloId = menu.articuloId;
            await this.menuDesayunoRepo.save(articulo);
            return new ServiceResponse(201, articulo, 'Menu created successfully');
        } catch (error) {
            return new ServiceResponse(500, null, 'Error creating menu', error);

        }

    }

}