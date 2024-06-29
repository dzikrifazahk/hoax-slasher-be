import { Module } from '@nestjs/common';
import { EducationEventsService } from './services/education-events.service';
import { EducationEventsController } from './controller/education-events.controller';
import { EducationEventEntity } from './entities/education-event.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventCommentsEntity } from './entities/event-comments.entity';
import { JwtService } from '@nestjs/jwt';
import { EventsCommentsController } from './controller/event-comments.controller';
import { EventCommentsService } from './services/event-comments.service';
import { EventRegisterEntity } from './entities/event-register.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EducationEventEntity,
      EventCommentsEntity,
      EventRegisterEntity,
    ]),
  ],
  controllers: [EducationEventsController, EventsCommentsController],
  providers: [EducationEventsService, JwtService, EventCommentsService],
})
export class EducationEventsModule {}
