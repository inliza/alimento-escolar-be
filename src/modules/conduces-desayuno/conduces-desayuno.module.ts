import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ArticuloDesayuno } from "src/entities/articulos-desayuno.entity";
import { DiaDisponibleMes } from "src/entities/dias-disponibles.entity";
import { CommonModule } from "src/common/common.module";
import { ConduceDesayuno } from "src/entities/conduces-desayuno.entity";
import { ConduceDesayunoService } from "./conduces-desayuno.service";
import { ConducesDesayunoController } from "./conduces-desayuno.controller";

@Module({
  imports: [TypeOrmModule.forFeature([ConduceDesayuno]), CommonModule],
  providers: [ConduceDesayunoService],
  controllers: [ConducesDesayunoController],
})
export class ConducesDesayunoModule {}