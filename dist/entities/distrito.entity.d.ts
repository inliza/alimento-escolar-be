import { Provincia } from './provincia.entity';
import { Escuela } from './escuela.entity';
export declare class Distrito {
    id: number;
    nombre: string;
    numero: string;
    idprovincia: number;
    provincia: Provincia;
    escuelas: Escuela[];
}
