import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SeedService } from './seed/seed.service';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  //enable seeding 
  // const seedService = app.get(SeedService);
  // await seedService.seed();

  const configService = app.get(ConfigService); // get the instance of ConfigService using app.get
  await app.listen(configService.get<number>('port') ?? 3000);
}
bootstrap();
