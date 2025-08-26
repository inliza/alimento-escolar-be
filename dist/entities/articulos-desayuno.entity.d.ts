import { MenuDesayuno } from './menu-desayuno.entity';
import { ConduceDesayuno } from 'src/entities/conduces-desayuno.entity';
export declare class ArticuloDesayuno {
    id: number;
    nombre: string;
    precio: string;
    itbis: boolean;
    isDeleted: boolean;
    menus?: MenuDesayuno[];
    conduces: ConduceDesayuno[];
}
