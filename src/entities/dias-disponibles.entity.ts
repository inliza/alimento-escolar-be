import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Check,
  Index,
} from 'typeorm';
import { MenuDesayuno } from './menu-desayuno.entity';

export enum DayOfWeek {
  Lunes = 1,
  Martes = 2,
  Miercoles = 3,
  Jueves = 4,
  Viernes = 5,
  Sabado = 6,
  Domingo = 7,
}

@Entity({ name: 'dias_disponibles_mes' })
@Check(`"dayOfTheWeek" BETWEEN 1 AND 7`)
@Check(`"orderInMonth" BETWEEN 1 AND 5`)
export class DiaDisponibleMes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  name: string;

  @Index()
  @Column({ type: 'int', name: 'dayoftheweek' })
  dayOfTheWeek: DayOfWeek; // 1=lunes ... 7=domingo

  @Index()
  @Column({ type: 'int', name: 'orderinmonth' })
  orderInMonth: number; // 1..5

  @OneToMany(() => MenuDesayuno, (menu) => menu.dia, { cascade: false })
  menus?: MenuDesayuno[];
}