import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('company')
export class Company {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    phone: string;

    @Column({ nullable: true })
    address: string;

    @Column({ nullable: true })
    rnc: string;

    @Column({ nullable: true })
    owner: string;

    @Column({ name: 'isactive', default: true })
    isActive: boolean;

    @Column({ name: 'isdeleted', default: false })
    isDeleted: boolean;

    @Column({ name: 'create_dt', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createDt: Date;
}