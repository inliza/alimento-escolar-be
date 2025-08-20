import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from 'src/common/common.module';
import { ConfigModule } from '@nestjs/config';
import { CompanyModule } from './modules/company/company.module';
import { ProfilesModule } from './modules/profiles/profiles.module';
import { UsersModule } from './modules/users/users.module';
import { EscuelasModule } from './modules/escuelas/escuela.module';
import { ArticulosModule } from './modules/articulos/articulos.module';
import { MenuModule } from './modules/menu/menu.module';

@Module({
  imports: [CommonModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    CompanyModule,
    ProfilesModule,
    UsersModule,
    EscuelasModule,
    ArticulosModule,
    MenuModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
