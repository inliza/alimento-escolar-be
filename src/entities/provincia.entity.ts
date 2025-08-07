import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Distrito } from './distrito.entity';
import { Localidad } from './localidad.entity';

@Entity('Provincias')
export class Provincia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  nombre: string;

  @OneToMany(() => Distrito, distrito => distrito.provincia)
  distritos: Distrito[];

  @OneToMany(() => Localidad, localidad => localidad.provincia)
  localidades: Localidad[];
}