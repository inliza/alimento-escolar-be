import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { ServiceResponse } from 'src/helpers/service-response';
import { Users } from 'src/entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post()
  async create(@Body() body: Partial<Users>): Promise<ServiceResponse<any>> {
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
  async update(@Param('id') id: string, @Body() body: Partial<Users>): Promise<ServiceResponse<any>> {
    return await this.service.update(+id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ServiceResponse<any>> {
    return await this.service.remove(+id);
  }
}