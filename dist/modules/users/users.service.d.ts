import { Users } from 'src/entities/user.entity';
import { ServiceResponse } from 'src/helpers/service-response';
import { Repository } from 'typeorm';
import { LoginDto } from 'src/dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { CompanyService } from '../company/company.service';
import { ProfilesService } from '../profiles/profiles.service';
import { CreateUserDto } from 'src/dtos/user-create.dto';
export declare class UsersService {
    private readonly userRepo;
    private jwtService;
    private readonly companyService;
    private readonly profilesService;
    constructor(userRepo: Repository<Users>, jwtService: JwtService, companyService: CompanyService, profilesService: ProfilesService);
    create(dto: CreateUserDto): Promise<ServiceResponse<Users | null>>;
    login(data: LoginDto): Promise<ServiceResponse<any>>;
    getLoggedUser(userId: number): Promise<ServiceResponse>;
    findAll(): Promise<ServiceResponse<Users[] | null>>;
    findOne(id: number): Promise<ServiceResponse<Users | null>>;
    update(id: number, data: Partial<Users>): Promise<ServiceResponse<any>>;
    remove(id: number): Promise<ServiceResponse<any>>;
}
