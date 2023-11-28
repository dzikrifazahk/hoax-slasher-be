import { Module } from '@nestjs/common';
import { SeedersService } from './seeders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import appConfig from 'config/app.config';
import { dataSourceOpt } from 'database/data-source';
import { UsersModule } from 'src/modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [appConfig]}),
    TypeOrmModule.forRoot({
      ...dataSourceOpt
    }),
    UsersModule
  ],
  providers: [SeedersService],
})
export class SeedersModule {}
