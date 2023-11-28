import { NestFactory } from '@nestjs/core';
import { SeedersService } from './seeders.service';
import { SeedersModule } from './seeders.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeedersModule);

  const seeder = app.get(SeedersService);
  try {
    await seeder.seed();
  } catch (error) {
    console.log(error);
  }
}

bootstrap();
