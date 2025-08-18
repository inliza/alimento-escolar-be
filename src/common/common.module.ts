import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database/database.module";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
    imports: [DatabaseModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                secret: config.get('JWT_SECRET'),
                signOptions: { expiresIn: '1h' },
            }),
        })
    ],
    exports: [JwtModule],
})
export class CommonModule { }