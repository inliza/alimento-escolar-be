import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Provincia } from './provincia.entity';
import { Escuela } from './escuela.entity';

@Entity('Distritos')
export class Distrito {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  nombre: string;

  @Column({ length: 4 })
  numero: string;

  @ManyToOne(() => Provincia, provincia => provincia.distritos)
  provincia: Provincia;

  @OneToMany(() => Escuela, escuela => escuela.distrito)
  escuelas: Escuela[];
}