import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Configuracion global de ValidationPipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //Elimina propiedades que no esten en el DTO
      forbidNonWhitelisted: true, //Lanza un error si hay propiedades que no esten en el DTO
      transform: true, //Transforma los tipos de datos segun el DTO
    })
  )
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();