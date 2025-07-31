import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(morgan('dev'));
  app.enableCors();

  const configService = app.get(ConfigService);

  const port = configService.get('PORT') || 3888;

  await app.listen(port, () => console.info(`Listening on port ${port}`));
}
bootstrap();
