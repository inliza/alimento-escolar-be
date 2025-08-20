import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Index,
  Unique,
  JoinColumn,
} from 'typeorm';
import { ArticuloDesayuno } from './articulos-desayuno.entity';
import { DiaDisponibleMes } from './dias-disponibles.entity';
import { Company } from './company.entity';

@Entity({ name: 'menu_desayuno' })
@Unique('UQ_menu_por_dia_articulo_company', ['dia', 'articulo', 'company'])
export class MenuDesayuno {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  descripcion?: string;

  @Column({ type: 'int', name: 'companyid' })
  companyId: number;

  @Column({ type: 'int', name: 'diaid' })
  diaId: number;

  @Column({ type: 'int', name: 'articuloid' })
  articuloId: number;

  // FK -> articulos_desayuno
  @Index()
  @ManyToOne(() => ArticuloDesayuno, (a) => a.menus, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'articuloid' })
  articulo: ArticuloDesayuno;

  // FK -> dias_disponibles_mes
  @Index()
  @ManyToOne(() => DiaDisponibleMes, (d) => d.menus, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'diaid' })
  dia: DiaDisponibleMes;

  // FK -> companies
  @Index()
  @ManyToOne(() => Company, (c) => c.breakfastMenus, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'companyid' })
  company: Company;
}