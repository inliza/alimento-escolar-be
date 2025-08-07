import { Localidad } from './localidad.entity';
import { Distrito } from './distrito.entity';
import { Company } from './company.entity';
export declare class Escuela {
    id: number;
    nombre: string;
    direccion: string;
    telefono?: string;
    director: string;
    codigoEscuela: string;
    racion: number;
    tipoEscuela?: string;
    deleted?: boolean;
    prepara?: boolean;
    prepara_Day?: string;
    localidad: Localidad;
    distrito: Distrito;
    company?: Company;
}
