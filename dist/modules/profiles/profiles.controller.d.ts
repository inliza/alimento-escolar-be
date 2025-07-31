import { ProfilesService } from './profiles.service';
import { ServiceResponse } from 'src/helpers/service-response';
import { Profiles } from 'src/entities/profile.entity';
export declare class ProfilesController {
    private readonly service;
    constructor(service: ProfilesService);
    create(body: Partial<Profiles>): Promise<ServiceResponse<any>>;
    findAll(): Promise<ServiceResponse<any>>;
    findOne(id: string): Promise<ServiceResponse<any>>;
    update(id: string, body: Partial<Profiles>): Promise<ServiceResponse<any>>;
    remove(id: string): Promise<ServiceResponse<any>>;
}
