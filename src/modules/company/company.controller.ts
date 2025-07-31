import { Controller, Get, Post, Body, Param, Put, Delete, HttpStatus } from '@nestjs/common';
import { CompanyService } from './company.service';
import { Company } from 'src/entities/company.entity';
import { ServiceResponse } from 'src/helpers/service-response';

@Controller('company')
export class CompanyController {ß
  constructor(private readonly service: CompanyService) {}

  @Post()
  async create(@Body() body: Partial<Company>): Promise<ServiceResponse<any>> {
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
  async update(
    @Param('id') id: string,
    @Body() body: Partial<Company>,
  ): Promise<ServiceResponse<any>> {
    return await this.service.update(+id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ServiceResponse<any>> {
    return await this.service.remove(+id);
  }
}