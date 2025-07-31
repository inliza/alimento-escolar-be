import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Users } from 'src/entities/user.entity';
import { Company } from 'src/entities/company.entity';
import { Profiles } from 'src/entities/profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Company, Profiles])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}