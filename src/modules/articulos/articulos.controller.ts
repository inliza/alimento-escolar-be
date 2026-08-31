import { Body, Controller, Get, Param, ParseIntPipe, Put, Req, Res, UseGuards } from "@nestjs/common";
import { ArticulosService } from "./articulos.service";
import { AuthMiddleware } from "src/common/middleware/auth.middleware";


@Controller('articulos')
export class ArticulosController {
  constructor(private readonly service: ArticulosService) {}

  @Get('desayuno')
  @UseGuards(AuthMiddleware)
  async findAll(@Req() request, @Res() response) {
    const res = await this.service.findAll();
    return response.status(res.code).send(res);
  }


  @Get('desayuno/:id')
  async findOne(@Param('id', ParseIntPipe) id: number, @Res() response) {
    const res = await this.service.findById(id);
    return response.status(res.code).send(res);
  }

  @Put('desayuno/:id')
  @UseGuards(AuthMiddleware)
  async updatePrice(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { precio: number | string },
    @Res() response,
  ) {
    const res = await this.service.updatePrice(id, body.precio);
    return response.status(res.code).send(res);
  }

}