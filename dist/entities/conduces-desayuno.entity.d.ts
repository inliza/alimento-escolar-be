import { ArticuloDesayuno } from 'src/entities/articulos-desayuno.entity';
import { Company } from 'src/entities/company.entity';
import { Escuela } from 'src/entities/escuela.entity';
export declare class ConduceDesayuno {
    id: number;
    codigoConduce: number;
    escuelaId: number;
    articuloId: number;
    cantidad: number;
    precio: number;
    total: number;
    itbis: number;
    fechaEntrega: Date;
    companyId: number;
    deleted: boolean;
    articulo: ArticuloDesayuno;
    company: Company;
    escuela: Escuela;
}
