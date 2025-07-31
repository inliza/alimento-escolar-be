import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ServiceResponse } from 'src/helpers/service-response';
import { Profiles } from 'src/entities/profile.entity';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly service: ProfilesService) {}

  @Post()
  async create(@Body() body: Partial<Profiles>): Promise<ServiceResponse<any>> {
    return await this.service.create(body);
  }

  @Get()
  async findAll(): Promise<ServiceResponse<any>> {
    return await this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ServiceResponse<any>> {
    return await this.service.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: Partial<Profiles>): Promise<ServiceResponse<any>> {
    return await this.service.update(+id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ServiceResponse<any>> {
    return await this.service.remove(+id);
  }
}