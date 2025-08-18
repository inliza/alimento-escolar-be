import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Escuela } from 'src/entities/escuela.entity';
import { EscuelasController } from './escuela.controller';
import { EscuelasService } from './escuela.service';
import { CommonModule } from 'src/common/common.module';
import { Localidad } from 'src/entities/localidad.entity';
import { Provincia } from 'src/entities/provincia.entity';
import { Distrito } from 'src/entities/distrito.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Escuela, Localidad, Provincia, Distrito]), CommonModule],
  controllers: [EscuelasController],
  providers: [EscuelasService],
})
export class EscuelasModule {}