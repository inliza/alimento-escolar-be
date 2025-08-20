import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ArticuloDesayuno } from "src/entities/articulos-desayuno.entity";
import { DiaDisponibleMes } from "src/entities/dias-disponibles.entity";
import { MenuDesayuno } from "src/entities/menu-desayuno.entity";
import { MenuService } from "./menu.service";
import { MenuController } from "./menu.controller";
import { CommonModule } from "src/common/common.module";

@Module({
  imports: [TypeOrmModule.forFeature([MenuDesayuno, DiaDisponibleMes]), CommonModule],
  providers: [MenuService],
  controllers: [MenuController],
})
export class MenuModule {}