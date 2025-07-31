import { registerAs } from '@nestjs/config';
export default registerAs('database', () => ({
  type: 'mongodb',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  logging: process.env.DATABASE_LOG,
  databaseName: process.env.DATABASE_NAME
}));
