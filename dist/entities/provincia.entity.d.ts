import { Distrito } from './distrito.entity';
import { Localidad } from './localidad.entity';
export declare class Provincia {
    id: number;
    nombre: string;
    distritos: Distrito[];
    localidades: Localidad[];
}
