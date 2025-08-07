import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Provincia } from './provincia.entity';
import { Escuela } from './escuela.entity';

@Entity('Localidades')
export class Localidad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  nombre: string;

  @ManyToOne(() => Provincia, provincia => provincia.localidades)
  provincia: Provincia;

  @OneToMany(() => Escuela, escuela => escuela.localidad)
  escuelas: Escuela[];
}