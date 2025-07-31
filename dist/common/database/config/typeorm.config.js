"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
const TypeOrmConfig = {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: +(process.env.DATABASE_PORT ?? 5432),
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    entities: ['dist/**/*.entity.{ts,js}'],
    migrations: ['dist/migrations/*{.ts,.js}'],
    migrationsRun: true,
    synchronize: process.env.DATABASE_SYNCHRONIZE === "true",
    logging: false,
    autoLoadEntities: true
};
exports.default = TypeOrmConfig;
//# sourceMappingURL=typeorm.config.js.map