import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Company } from './company.entity';
import { Profiles } from './profile.entity';
@Entity('users')
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Company, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idcompany' })
  company: Company;

  @Column({ name: 'firstname' })
  firstName: string;

  @Column({ name: 'lastname' })
  lastName: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @ManyToOne(() => Profiles, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'idprofile' })
  profile: Profiles;

  @Column({ name: 'isactive', default: true })
  isActive: boolean;

  @Column({ name: 'isdeleted', default: false })
  isDeleted: boolean;

  @Column({ name: 'create_dt', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createDt: Date;

  @Column({ name: 'createdby', nullable: true })
  createdBy: string;
}