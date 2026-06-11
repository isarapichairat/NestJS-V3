import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SeedService } from './seed/seed.service';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  /**
   * You can enable the seeding here
   */
  // const seedService = app.get(SeedService);
  // await seedService.seed();

  const config = new DocumentBuilder() //1
    .setTitle("Spotify Clone")
    .setDescription("The Spotify Clone Api documentation")
    .setVersion("1.0")
    .addBearerAuth(
      // Enable Bearer Auth here
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        name: "JWT",
        description: "Enter JWT token",
        in: "header",
      },
      'JWT-auth',
    )
        .build();

  const document = SwaggerModule.createDocument(app, config); //2
  SwaggerModule.setup("api", app, document); //3


  const configService = app.get(ConfigService);
  await app.listen(configService.get<number>('port') ?? 3000);



  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();