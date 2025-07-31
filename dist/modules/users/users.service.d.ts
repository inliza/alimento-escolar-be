import { Users } from 'src/entities/user.entity';
import { ServiceResponse } from 'src/helpers/service-response';
import { Repository } from 'typeorm';
export declare class UsersService {
    private readonly userRepo;
    constructor(userRepo: Repository<Users>);
    create(data: Partial<Users>): Promise<ServiceResponse<Users | null>>;
    findAll(): Promise<ServiceResponse<Users[] | null>>;
    findOne(id: number): Promise<ServiceResponse<Users | null>>;
    update(id: number, data: Partial<Users>): Promise<ServiceResponse<any>>;
    remove(id: number): Promise<ServiceResponse<any>>;
}
