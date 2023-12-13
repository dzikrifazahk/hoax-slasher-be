import { Module } from '@nestjs/common';
import { DebunkingService } from './debunking.service';
import { DebunkingController } from './debunking.controller';

@Module({
  controllers: [DebunkingController],
  providers: [DebunkingService],
})
export class DebunkingModule {}
