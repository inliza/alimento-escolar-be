
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provincia } from 'src/entities/provincia.entity';
import { ProvinciasService } from './provincia.service';


@Module({
  imports: [TypeOrmModule.forFeature([Provincia])],
  providers: [ProvinciasService],
})
export class ProvinciasModule {}