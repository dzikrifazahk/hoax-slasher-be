import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BaseDto } from './common/dtos/base.dto';
import { BasePaginationDto } from './common/dtos/pagination.dto';

async function bootstrap() {
  const port = process.env.PORT;
  const app = await NestFactory.create(AppModule, { cors: true });
  //Swagger
  const config = new DocumentBuilder()
    .setTitle('Hoax Slasher Backend')
    .setDescription('Hoax Slasher Application')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [BaseDto, BasePaginationDto],
  });

  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
  await app.listen(port);
}
bootstrap();
