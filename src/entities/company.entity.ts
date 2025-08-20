import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Escuela } from './escuela.entity';
import { MenuDesayuno } from './menu-desayuno.entity';

@Entity('company')
export class Company {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: false })
    phone: string;

    @Column({ nullable: false })
    alias: string;

    @Column({ nullable: false })
    address: string;

    @Column({ nullable: false })
    rnc: string;

    @Column({ nullable: false })
    owner: string;

    @Column({ name: 'isactive', default: true })
    isActive: boolean;

    @Column({ name: 'isdeleted', default: false })
    isDeleted: boolean;

    @Column({ name: 'create_dt', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createDt: Date;


    @OneToMany(() => Escuela, escuela => escuela.company)
    escuelas: Escuela[];

    @OneToMany(() => MenuDesayuno, (m) => m.company)
    breakfastMenus?: MenuDesayuno[];
}