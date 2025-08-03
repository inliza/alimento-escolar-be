import { Controller, Get, Post, Body, Param, Put, Delete, Res, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { ServiceResponse } from 'src/helpers/service-response';
import { Users } from 'src/entities/user.entity';
import { CreateUserDto } from 'src/dtos/user-create.dto';
import { LoginDto } from 'src/dtos/login.dto';
import { AuthMiddleware } from 'src/common/middleware/auth.middleware';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) { }

  @Post()
  async create(@Body() body: CreateUserDto, @Res() response): Promise<ServiceResponse<any>> {
    const res = await this.service.create(body);
    return response.status(res.code).send(res);
  }

  @Post('login')
  async login(@Body() body: LoginDto, @Res() response): Promise<ServiceResponse<any>> {
    const res = await this.service.login(body);
    return response.status(res.code).send(res);
  }

  @Get('logged')
  @UseGuards(AuthMiddleware)
  async getLogged(@Req() request, @Res() response) {
    const res = await this.service.getLoggedUser(request.claims.sub);
    return response.status(res.code).send(res);
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