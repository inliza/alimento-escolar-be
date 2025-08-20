import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { MenuService } from "./menu.service";
import { AuthMiddleware } from "src/common/middleware/auth.middleware";
import { CreateMenuDto } from "src/dtos/menu-create.dto";


@Controller('menu')
export class MenuController {
    constructor(private readonly service: MenuService) { }


    @Get('dias-disponibles')
    @UseGuards(AuthMiddleware)
    async findAll(@Req() request, @Res() response) {
        const res = await this.service.findAllDaysAvailable(request.claims.company);
        return response.status(res.code).send(res);
    }

    @Get('')
    @UseGuards(AuthMiddleware)
    async findAllMenu(@Req() request, @Res() response) {
        const res = await this.service.findAllMenu(request.claims.company);
        return response.status(res.code).send(res); 
    }

      @Post()
      @UseGuards(AuthMiddleware)
      create(@Req() request, @Body() createMenuDto: CreateMenuDto) {
        return this.service.create(createMenuDto, request.claims.company);
      }

}