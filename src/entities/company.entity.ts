import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}