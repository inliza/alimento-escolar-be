import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Localidad } from './localidad.entity';
import { Distrito } from './distrito.entity';
import { Company } from './company.entity';

@Entity('Escuelas')
export class Escuela {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 70 })
  nombre: string;

  @Column('text')
  direccion: string;

  @Column({ length: 12, nullable: true })
  telefono?: string;

  @Column({ length: 50 })
  director: string;

  @Column({ length: 50 })
  codigoEscuela: string;

  @Column('int')
  racion: number;

  @Column({ type: 'char', length: 1, nullable: true })
  tipoEscuela?: string;

  @Column({ type: 'boolean', nullable: true })
  deleted?: boolean;

  @Column({ type: 'boolean', nullable: true })
  prepara?: boolean;

  @Column({ length: 50, nullable: true })
  prepara_Day?: string;

  @ManyToOne(() => Localidad, localidad => localidad.escuelas)
  localidad: Localidad;

  @ManyToOne(() => Distrito, distrito => distrito.escuelas)
  distrito: Distrito;

  @ManyToOne(() => Company, company => company.escuelas, { nullable: true })
  company?: Company;
}