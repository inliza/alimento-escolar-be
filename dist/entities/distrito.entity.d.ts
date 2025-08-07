import { Provincia } from './provincia.entity';
import { Escuela } from './escuela.entity';
export declare class Distrito {
    id: number;
    nombre: string;
    numero: string;
    provincia: Provincia;
    escuelas: Escuela[];
}
