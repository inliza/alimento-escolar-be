import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/user.entity';
import { ServiceResponse } from 'src/helpers/service-response';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { LoginDto } from 'src/dtos/login.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CompanyService } from '../company/company.service';
import { ProfilesService } from '../profiles/profiles.service';
import { CreateUserDto } from 'src/dtos/user-create.dto';
import { Company } from 'src/entities/company.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepo: Repository<Users>,
    private jwtService: JwtService,
    private readonly companyService: CompanyService,
    private readonly profilesService: ProfilesService,
  ) { }

  async create(dto: CreateUserDto): Promise<ServiceResponse<Users | null>> {
    try {

      const exists = await this.userRepo.findOne({
        where: { username: dto.username },
      });

      if (exists) {
        return new ServiceResponse(HttpStatus.CONFLICT, null, 'Username already exists');
      }

      const user = new Users();

      const companyResp = await this.companyService.findOne(dto.idCompany);
      if (companyResp.code !== HttpStatus.OK) {
        return new ServiceResponse(HttpStatus.BAD_REQUEST, null, 'Invalid company');
      }


      let profile: any = null;
      if (dto.idProfile) {
        const profileResp = await this.profilesService.findOne(dto.idProfile);
        if (profileResp.code !== HttpStatus.OK) {
          return new ServiceResponse(HttpStatus.BAD_REQUEST, null, 'Invalid profile');
        }
        profile = profileResp.content;
      }

      user.firstName = dto.firstName;
      user.lastName = dto.lastName;
      user.username = dto.username;
      user.profile = profile;
      user.password = await hash(dto.password, 10);
      user.company = companyResp.content as Company;

      await this.userRepo.save(user);
      console.log('User created successfully:', dto.username, dto.idCompany);
      return new ServiceResponse(HttpStatus.CREATED, user);
    } catch (error) {
      return new ServiceResponse(HttpStatus.INTERNAL_SERVER_ERROR, null, 'Error creating user', error);
    }
  }


  async login(data: LoginDto): Promise<ServiceResponse<any>> {
    try {

      const exists = await this.userRepo.findOne({
        where: { username: data.username },
      });

      if (!exists) {
        return new ServiceResponse(HttpStatus.UNAUTHORIZED, null, 'Usuario o contraseña incorrectos');
      }

      const isValid = await compare(data.password, exists.password);

      if (!isValid) {
        console.log('Invalid credentials for user:', data.username);
        return new ServiceResponse(HttpStatus.UNAUTHORIZED, null, 'Usuario o contraseña incorrectos');
      }

      const payload = { username: exists.username, sub: exists.id };
      const token = await this.jwtService.sign(payload);
      return new ServiceResponse(HttpStatus.CREATED, {
        access_token: token
      });

    } catch (error) {
      return new ServiceResponse(HttpStatus.INTERNAL_SERVER_ERROR, null, 'Error login user', error);
    }
  }
  async getLoggedUser(userId: number): Promise<ServiceResponse> {
    const user = await this.userRepo.findOne({ where: { id:userId } });
    // const options = this._rolesService.getOptionsByRoleId(roleId);
    return new ServiceResponse(HttpStatus.OK, user);
  }


  async findAll(): Promise<ServiceResponse<Users[] | null>> {
    try {
      const users = await this.userRepo.find({
        relations: ['company', 'profile'],
      });
      return new ServiceResponse(HttpStatus.OK, users);
    } catch (error) {
      return new ServiceResponse(HttpStatus.INTERNAL_SERVER_ERROR, null, 'Error fetching users', error);
    }
  }

  async findOne(id: number): Promise<ServiceResponse<Users | null>> {
    try {
      const user = await this.userRepo.findOne({
        where: { id },
        relations: ['company', 'profile'],
      });

      if (!user) {
        return new ServiceResponse(HttpStatus.NOT_FOUND, null, 'User not found');
      }

      return new ServiceResponse(HttpStatus.OK, user);
    } catch (error) {
      return new ServiceResponse(HttpStatus.INTERNAL_SERVER_ERROR, null, 'Error fetching user', error);
    }
  }

  async update(id: number, data: Partial<Users>): Promise<ServiceResponse<any>> {
    try {
      const result = await this.userRepo.update(id, data);

      if (result.affected === 0) {
        return new ServiceResponse(HttpStatus.NOT_FOUND, null, 'User not found');
      }

      return new ServiceResponse(HttpStatus.OK, result, 'User updated successfully');
    } catch (error) {
      return new ServiceResponse(HttpStatus.INTERNAL_SERVER_ERROR, null, 'Error updating user', error);
    }
  }

  async remove(id: number): Promise<ServiceResponse<any>> {
    try {
      const result = await this.userRepo.softDelete(id);

      if (result.affected === 0) {
        return new ServiceResponse(HttpStatus.NOT_FOUND, null, 'User not found');
      }

      return new ServiceResponse(HttpStatus.OK, result, 'User deleted successfully');
    } catch (error) {
      return new ServiceResponse(HttpStatus.INTERNAL_SERVER_ERROR, null, 'Error deleting user', error);
    }
  }
}