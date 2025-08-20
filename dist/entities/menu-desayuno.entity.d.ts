import { ArticuloDesayuno } from './articulos-desayuno.entity';
import { DiaDisponibleMes } from './dias-disponibles.entity';
import { Company } from './company.entity';
export declare class MenuDesayuno {
    id: number;
    descripcion?: string;
    companyId: number;
    diaId: number;
    articuloId: number;
    articulo: ArticuloDesayuno;
    dia: DiaDisponibleMes;
    company: Company;
}
