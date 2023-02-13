import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LogInterceptor } from './interceptors/log.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalInterceptors(new LogInterceptor());
  await app.listen(Number(process.env.PORT));
  console.log(`server up and running at port ${process.env.PORT}!`);
}
bootstrap();
