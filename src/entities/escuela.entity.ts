import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Localidad } from './localidad.entity';
import { Distrito } from './distrito.entity';
import { Company } from './company.entity';

@Entity('escuelas')
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

  @Column({ length: 50, name: 'codigoescuela' })
  codigoEscuela: string;

  @Column('int')
  racion: number;

  @Column({ type: 'char', length: 1, nullable: true, default: 'P', name: 'tipoescuela' })
  tipoEscuela?: string;

  @Column({ type: 'boolean', nullable: true })
  deleted?: boolean;

  @Column({ type: 'boolean', nullable: true })
  prepara?: boolean;

  @Column({ length: 50, nullable: true, name: 'prepara_day' })
  prepara_Day?: string;

  @Column({ type: 'int', name: 'idlocalidad' })
  idLocalidad: number;

  @Column({ type: 'int', name: 'iddistrito' })
  idDistrito: number;

  @Column({ type: 'int', nullable: true, name: 'idcompany' })
  idCompany: number;

  @ManyToOne(() => Localidad, localidad => localidad.escuelas)
  @JoinColumn({ name: 'idlocalidad' })
  localidad: Localidad;

  @ManyToOne(() => Distrito, distrito => distrito.escuelas)
  @JoinColumn({ name: 'iddistrito' })
  distrito: Distrito;

  @ManyToOne(() => Company, company => company.escuelas, { nullable: true })
  @JoinColumn({ name: 'idcompany' })
  company?: Company;
}