import { Profiles } from 'src/entities/profile.entity';
import { ServiceResponse } from 'src/helpers/service-response';
import { Repository } from 'typeorm';
export declare class ProfilesService {
    private readonly profileRepo;
    constructor(profileRepo: Repository<Profiles>);
    create(data: Partial<Profiles>): Promise<ServiceResponse<Profiles | null>>;
    findAll(): Promise<ServiceResponse<Profiles[] | null>>;
    findOne(id: number): Promise<ServiceResponse<Profiles | null>>;
    update(id: number, data: Partial<Profiles>): Promise<ServiceResponse<any>>;
    remove(id: number): Promise<ServiceResponse<any>>;
}
