import { MenuDesayuno } from './menu-desayuno.entity';
export declare class ArticuloDesayuno {
    id: number;
    nombre: string;
    precio: string;
    itbis: boolean;
    isDeleted: boolean;
    menus?: MenuDesayuno[];
}
