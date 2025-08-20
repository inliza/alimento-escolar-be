import { Escuela } from './escuela.entity';
import { MenuDesayuno } from './menu-desayuno.entity';
export declare class Company {
    id: number;
    name: string;
    phone: string;
    alias: string;
    address: string;
    rnc: string;
    owner: string;
    isActive: boolean;
    isDeleted: boolean;
    createDt: Date;
    escuelas: Escuela[];
    breakfastMenus?: MenuDesayuno[];
}
