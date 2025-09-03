import { Body, Controller, Delete, Get, Param, ParseArrayPipe, Post, Query, Req, Res, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ConduceDesayunoService } from "./conduces-desayuno.service";
import { AuthMiddleware } from "src/common/middleware/auth.middleware";
import { ServiceResponse } from "src/helpers/service-response";
import { CreateConduceDto } from "src/dtos/conduce-desayuno-create.dto";

@Controller('conduces-desayuno')
export class ConducesDesayunoController {
    constructor(private readonly service: ConduceDesayunoService) { }



    @Get('next')
    @UseGuards(AuthMiddleware)
    async findOne(@Req() request, @Res() response): Promise<ServiceResponse<any>> {
        const res = await this.service.getSiguienteCodigo(request.claims.company);
        return response.status(res.code).send(res);
    }

    @Post('bulk')
    @UseGuards(AuthMiddleware)
    @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
    async createBulk(
        @Body(new ParseArrayPipe({ items: CreateConduceDto, whitelist: true }))
        dtos: CreateConduceDto[],
        @Req() request,
        @Res() response
    ): Promise<ServiceResponse> {
        const res = await this.service.createBulk(dtos, request.claims.company);
        return response.status(res.code).send(res);
    }

    @Get('by-date')
    @UseGuards(AuthMiddleware)
    async getPorFecha(
        @Req() request,
        @Query('from') desde: string,
        @Query('to') hasta?: string,
        @Query('schoolId') escuelaId: string = '0',
    ): Promise<ServiceResponse> {
        return this.service.findByFechaRango(request.claims.company, desde, hasta, Number(escuelaId));
    }

    @Delete('delete/:id')
    @UseGuards(AuthMiddleware)
    async softDelete(@Req() request, @Param('id') id: string) {
        return this.service.softDelete(Number(id), request.claims.company,);
    }



    @Get('data')
    @UseGuards(AuthMiddleware)
    async getData(@Req() request, @Res() response): Promise<ServiceResponse<any>> {
        const res = await this.service.getUltimasFechasConTotales(request.claims.company);
        return response.status(res.code).send(res);
    }

    @Get('relacion')
    @UseGuards(AuthMiddleware)
    async getRelacion(
        @Req() request,
        @Res() response,
        @Query('from') desde: string,
        @Query('to') hasta?: string,
        @Query('schoolId') escuelaId: string = '0',
    ): Promise<ServiceResponse> {

        const res = await

            this.service.getRelacionPivot(
                Number(request.claims.company),
                String(desde),
                hasta ? String(hasta) : undefined,
                Number(escuelaId),
            );
        return response.status(res.code).send(res);

    }

}