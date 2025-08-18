import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { EscuelasService } from './escuela.service';
import { CreateEscuelaDto } from 'src/dtos/escuela-create.dto';
import { UpdateEscuelaDto } from 'src/dtos/escuela-update.dto';
import { AuthMiddleware } from 'src/common/middleware/auth.middleware';


@Controller('escuelas')
export class EscuelasController {
  constructor(private readonly escuelasService: EscuelasService) { }

  @Post()
  @UseGuards(AuthMiddleware)
  create(@Req() request, @Body() createEscuelaDto: CreateEscuelaDto) {
    return this.escuelasService.create(createEscuelaDto, request.claims.company);
  }

  @Get()
  @UseGuards(AuthMiddleware)
  async findAll(@Req() request, @Res() response) {
    const res = await this.escuelasService.findAll(request.claims.company);
    return response.status(res.code).send(res);
  }

  @Get('provincias')
  @UseGuards(AuthMiddleware)
  async findProvinces(@Res() response) {
    const res = await this.escuelasService.findAllProvince();
    return response.status(res.code).send(res);
  }

  @Get('distritos-by-province/:id')
  @UseGuards(AuthMiddleware)
  async findDistritos(@Param('id', ParseIntPipe) id: number, @Res() response) {
    const res = await this.escuelasService.findAllDistritos(id);
    return response.status(res.code).send(res);
  }

  @Get('localidades-by-province/:id')
  @UseGuards(AuthMiddleware)
  async findLocalidades(@Param('id', ParseIntPipe) id: number, @Res() response) {
    const res = await this.escuelasService.findAllLocalidades(id);
    return response.status(res.code).send(res);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number, @Res() response) {
    const res = await this.escuelasService.findById(id);
    return response.status(res.code).send(res);
  }

  @Delete(':id')
  @UseGuards(AuthMiddleware)
  async remove(@Param('id', ParseIntPipe) id: number, @Res() response, @Req() request) {
    const res = await this.escuelasService.remove(id, request.claims.company);
    return response.status(res.code).send(res);
  }

  @Put(':id')
  @UseGuards(AuthMiddleware)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Req() request,
    @Res() response,
    @Body() updateEscuelaDto: UpdateEscuelaDto,
  ) {
    const res = await this.escuelasService.update(id, updateEscuelaDto, request.claims.company);
    return response.status(res.code).send(res);
  }
}