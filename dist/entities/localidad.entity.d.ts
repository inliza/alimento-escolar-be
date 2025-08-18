import { Provincia } from './provincia.entity';
import { Escuela } from './escuela.entity';
export declare class Localidad {
    id: number;
    nombre: string;
    idprovincia: number;
    provincia: Provincia;
    escuelas: Escuela[];
}
