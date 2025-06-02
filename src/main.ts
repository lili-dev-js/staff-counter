import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Request, Response, NextFunction } from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(3000, '0.0.0.0');
  app.use((req: Request, res: Response, next: NextFunction) => {
    next();
  });
}

bootstrap()
  .then()
  .catch((err) => {
    console.log(err);
  });
