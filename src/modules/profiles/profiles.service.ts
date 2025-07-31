import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profiles } from 'src/entities/profile.entity';
import { ServiceResponse } from 'src/helpers/service-response';
import { Repository } from 'typeorm';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profiles)
    private readonly profileRepo: Repository<Profiles>,
  ) {}

  async create(data: Partial<Profiles>): Promise<ServiceResponse<Profiles | null>> {
    try {
      const profile = this.profileRepo.create(data);
      const saved = await this.profileRepo.save(profile);
      return new ServiceResponse(HttpStatus.CREATED, saved);
    } catch (error) {
      return new ServiceResponse(HttpStatus.INTERNAL_SERVER_ERROR, null, 'Error creating profile', error);
    }
  }

  async findAll(): Promise<ServiceResponse<Profiles[] | null>> {
    try {
      const profiles = await this.profileRepo.find();
      return new ServiceResponse(HttpStatus.OK, profiles);
    } catch (error) {
      return new ServiceResponse(HttpStatus.INTERNAL_SERVER_ERROR, null, 'Error fetching profiles', error);
    }
  }

  async findOne(id: number): Promise<ServiceResponse<Profiles | null>> {
    try {
      const profile = await this.profileRepo.findOne({ where: { id } });
      if (!profile) {
        return new ServiceResponse(HttpStatus.NOT_FOUND, null, 'Profile not found');
      }
      return new ServiceResponse(HttpStatus.OK, profile);
    } catch (error) {
      return new ServiceResponse(HttpStatus.INTERNAL_SERVER_ERROR, null, 'Error fetching profile', error);
    }
  }

  async update(id: number, data: Partial<Profiles>): Promise<ServiceResponse<any>> {
    try {
      const result = await this.profileRepo.update(id, data);
      if (result.affected === 0) {
        return new ServiceResponse(HttpStatus.NOT_FOUND, null, 'Profile not found');
      }
      return new ServiceResponse(HttpStatus.OK, result, 'Profile updated successfully');
    } catch (error) {
      return new ServiceResponse(HttpStatus.INTERNAL_SERVER_ERROR, null, 'Error updating profile', error);
    }
  }

  async remove(id: number): Promise<ServiceResponse<any>> {
    try {
      const result = await this.profileRepo.softDelete(id);
      if (result.affected === 0) {
        return new ServiceResponse(HttpStatus.NOT_FOUND, null, 'Profile not found');
      }
      return new ServiceResponse(HttpStatus.OK, result, 'Profile deleted successfully');
    } catch (error) {
      return new ServiceResponse(HttpStatus.INTERNAL_SERVER_ERROR, null, 'Error deleting profile', error);
    }
  }
}