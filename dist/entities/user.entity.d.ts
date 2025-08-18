import { Company } from './company.entity';
import { Profiles } from './profile.entity';
export declare class Users {
    id: number;
    idCompany: number;
    company: Company;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    idProfile: number;
    profile: Profiles;
    isActive: boolean;
    isDeleted: boolean;
    createDt: Date;
    createdBy: string;
}
