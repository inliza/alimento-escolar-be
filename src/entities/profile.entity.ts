import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('profiles')
export class Profiles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}