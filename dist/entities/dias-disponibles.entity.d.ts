import { MenuDesayuno } from './menu-desayuno.entity';
export declare enum DayOfWeek {
    Lunes = 1,
    Martes = 2,
    Miercoles = 3,
    Jueves = 4,
    Viernes = 5,
    Sabado = 6,
    Domingo = 7
}
export declare class DiaDisponibleMes {
    id: number;
    name: string;
    dayOfTheWeek: DayOfWeek;
    orderInMonth: number;
    menus?: MenuDesayuno[];
}
