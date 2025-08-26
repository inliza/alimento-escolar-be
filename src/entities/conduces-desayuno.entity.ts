import { ArticuloDesayuno } from 'src/entities/articulos-desayuno.entity';
import { Company } from 'src/entities/company.entity';
import { Escuela } from 'src/entities/escuela.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('conduces_desayuno')
export class ConduceDesayuno {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'codigo_conduce', type: 'int' })
  codigoConduce: number;

  @Column({ name: 'escuelaid', type: 'int' })
  escuelaId: number;

  @Column({ name: 'articuloid', type: 'int' })
  articuloId: number;

  @Column({ type: 'int' })
  cantidad: number;

  @Column({ type: 'numeric', precision: 12, scale: 2 })
  precio: number;

  @Column({ type: 'numeric', precision: 12, scale: 2 })
  total: number;

  @Column({ type: 'numeric', precision: 12, scale: 2, nullable: true })
  itbis: number;

  @Column({ name: 'fecha_entrega', type: 'date' })
  fechaEntrega: Date;

  @Column({ name: 'companyid', type: 'int', nullable: true })
  companyId: number;

  @Column({ type: 'boolean', default: false })
  deleted: boolean;

  // 🔗 Relaciones
  @ManyToOne(() => ArticuloDesayuno, (articulo) => articulo.conduces, {
    eager: true,
  })
  @JoinColumn({ name: 'articuloid' })
  articulo: ArticuloDesayuno;

  @ManyToOne(() => Company, (company) => company.conduces, {
    eager: true,
  })
  @JoinColumn({ name: 'companyid' })
  company: Company;

  @ManyToOne(() => Escuela, (escuela) => escuela.conduces, {
    eager: true,
  })
  @JoinColumn({ name: 'escuelaid' })
  escuela: Escuela;
}