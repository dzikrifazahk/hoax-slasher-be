import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventCommentsEntity } from '../entities/event-comments.entity';
import { CreateOrUpdateDtoIn } from '../dto/event-comments.dto';

@Injectable()
export class EventCommentsService {
  constructor(
    @InjectRepository(EventCommentsEntity)
    private readonly eventCommentRepository: Repository<EventCommentsEntity>,
  ) {}
  async createOrUpdate(dto: CreateOrUpdateDtoIn) {
    const MINIMUM_NAME_LENGTH = 2;
    let message: string;
    const foundEvent = dto.id
      ? await this.eventCommentRepository.findOne({
          where: {
            id: dto.id,
          },
        })
      : null;

    if (dto.message.length < MINIMUM_NAME_LENGTH) {
      throw new BadRequestException(
        `News title should be at least ${MINIMUM_NAME_LENGTH} characters long`,
      );
    }

    if (foundEvent) {
      if (dto.message) {
        foundEvent.message = dto.message;
      }

      if (dto.educationEventId) {
        foundEvent.educationEvent = dto.educationEventId;
      }

      if (dto.userId) {
        foundEvent.user = dto.userId;
      }

      foundEvent.updatedAt = new Date();

      await this.eventCommentRepository.save(foundEvent);

      message = 'Event Comment Updated';

      return { message: message, data: foundEvent };
    } else {
      console.log('ini dot murni', dto);
      const createData = this.eventCommentRepository.create({
        message: dto.message,
        ...(dto.educationEventId && {
          educationEvent: dto.educationEventId,
        }),
        ...(dto.userId && { user: dto.userId }),
      });
      console.log('ini dot', createData);

      await this.eventCommentRepository.save(createData);
      message = 'Event Comment Created';
      return { message: message, data: createData };
    }
  }

  async findAll() {
    const foundEvents = await this.eventCommentRepository.find({
      order: {
        updatedAt: 'DESC',
      },
      relations: ['educationEvent', 'user'],
    });
    if (!foundEvents) {
      throw new BadRequestException('No data found');
    }
    return foundEvents;
  }

  async findOne(id: string) {
    const foundEvent = await this.eventCommentRepository.findOne({
      where: {
        id: id,
      },
      relations: ['educationEvent', 'user'],
    });
    if (!foundEvent) {
      throw new BadRequestException('No data found');
    }
    return foundEvent;
  }

  async remove(id: string) {
    const deletedEvent = await this.eventCommentRepository.delete(id);
    if (!deletedEvent) {
      throw new BadRequestException('No data found');
    }
    return deletedEvent;
  }
}
