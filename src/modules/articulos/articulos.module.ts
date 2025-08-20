import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ArticuloDesayuno } from "src/entities/articulos-desayuno.entity";
import { DiaDisponibleMes } from "src/entities/dias-disponibles.entity";
import { ArticulosService } from "./articulos.service";
import { ArticulosController } from "./articulos.controller";
import { CommonModule } from "src/common/common.module";

@Module({
  imports: [TypeOrmModule.forFeature([ArticuloDesayuno]), CommonModule],
  providers: [ArticulosService],
  controllers: [ArticulosController],
  exports: [ArticulosService],
})
export class ArticulosModule {}