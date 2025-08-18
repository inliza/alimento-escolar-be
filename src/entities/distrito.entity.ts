import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Provincia } from './provincia.entity';
import { Escuela } from './escuela.entity';

@Entity('distritos')
export class Distrito {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  nombre: string;

  @Column({ length: 4 })
  numero: string;

  @Column({ type: 'int', name: 'idprovincia' })
  idprovincia: number;

  @ManyToOne(() => Provincia, provincia => provincia.localidades)
  @JoinColumn({ name: 'idprovincia' })
  provincia: Provincia;

  @OneToMany(() => Escuela, escuela => escuela.distrito)
  escuelas: Escuela[];
}