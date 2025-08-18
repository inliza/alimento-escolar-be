import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Users } from 'src/entities/user.entity';
import { Company } from 'src/entities/company.entity';
import { Profiles } from 'src/entities/profile.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CompanyModule } from '../company/company.module';
import { ProfilesModule } from '../profiles/profiles.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [TypeOrmModule.forFeature([Users]), PassportModule, ConfigModule, CompanyModule, ProfilesModule, CommonModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule { }