import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Escuela } from 'src/entities/escuela.entity';
import { EscuelasController } from './escuela.controller';
import { EscuelasService } from './escuela.service';


@Module({
  imports: [TypeOrmModule.forFeature([Escuela])],
  controllers: [EscuelasController],
  providers: [EscuelasService],
})
export class EscuelasModule {}