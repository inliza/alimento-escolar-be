import { UsersService } from './users.service';
import { ServiceResponse } from 'src/helpers/service-response';
import { Users } from 'src/entities/user.entity';
import { CreateUserDto } from 'src/dtos/user-create.dto';
import { LoginDto } from 'src/dtos/login.dto';
export declare class UsersController {
    private readonly service;
    constructor(service: UsersService);
    create(body: CreateUserDto, response: any): Promise<ServiceResponse<any>>;
    login(body: LoginDto, response: any): Promise<ServiceResponse<any>>;
    getLogged(request: any, response: any): Promise<any>;
    findAll(): Promise<ServiceResponse<any>>;
    findOne(id: string): Promise<ServiceResponse<any>>;
    update(id: string, body: Partial<Users>): Promise<ServiceResponse<any>>;
    remove(id: string): Promise<ServiceResponse<any>>;
}
