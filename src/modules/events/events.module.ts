import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { EventEntity } from './entities/event.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([EventEntity])
  ],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
