import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Index,
} from 'typeorm';
import { MenuDesayuno } from './menu-desayuno.entity';

@Entity({ name: 'articulos_desayuno' })
export class ArticuloDesayuno {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  @Index()
  nombre: string;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  precio: string;

  @Column({ type: 'boolean', default: false })
  itbis: boolean;

  @Column({ name: 'isdeleted', default: false })
  isDeleted: boolean;

  @OneToMany(() => MenuDesayuno, (menu) => menu.articulo, { cascade: false })
  menus?: MenuDesayuno[];


}
