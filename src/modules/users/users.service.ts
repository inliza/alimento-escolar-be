import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/user.entity';
import { ServiceResponse } from 'src/helpers/service-response';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepo: Repository<Users>,
  ) {}

  async create(data: Partial<Users>): Promise<ServiceResponse<Users | null>> {
    try {
      const user = this.userRepo.create(data);
      const saved = await this.userRepo.save(user);
      return new ServiceResponse(HttpStatus.CREATED, saved);
    } catch (error) {
      return new ServiceResponse(HttpStatus.INTERNAL_SERVER_ERROR, null, 'Error creating user', error);
    }
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