import { UsersService } from './users.service';
import { ServiceResponse } from 'src/helpers/service-response';
import { Users } from 'src/entities/user.entity';
export declare class UsersController {
    private readonly service;
    constructor(service: UsersService);
    create(body: Partial<Users>): Promise<ServiceResponse<any>>;
    findAll(): Promise<ServiceResponse<any>>;
    findOne(id: string): Promise<ServiceResponse<any>>;
    update(id: string, body: Partial<Users>): Promise<ServiceResponse<any>>;
    remove(id: string): Promise<ServiceResponse<any>>;
}
