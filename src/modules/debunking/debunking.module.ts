import { Module } from '@nestjs/common';
import { DebunkingService } from './debunking.service';
import { DebunkingController } from './debunking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DebunkingEntity } from './entities/debunking.entity';
import { JwtService } from '@nestjs/jwt';
import { NewsEntity } from '../news/entities/news.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DebunkingEntity, NewsEntity])
  ],
  controllers: [DebunkingController],
  providers: [DebunkingService, JwtService],
})
export class DebunkingModule {}
