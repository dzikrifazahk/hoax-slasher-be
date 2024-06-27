import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEducationEventDtoIn } from '../dto/education-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EducationEventEntity } from '../entities/education-event.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EducationEventsService {
  constructor(
    @InjectRepository(EducationEventEntity)
    private readonly educationEventRepository: Repository<EducationEventEntity>,
  ) {}
  async createOrUpdate(dto: CreateEducationEventDtoIn) {
    const MINIMUM_NAME_LENGTH = 2;
    let message: string;
    const foundEvent = dto.id
      ? await this.educationEventRepository.findOne({
          where: {
            id: dto.id,
          },
        })
      : null;

    if (dto.title.length < MINIMUM_NAME_LENGTH) {
      throw new BadRequestException(
        `News title should be at least ${MINIMUM_NAME_LENGTH} characters long`,
      );
    }

    if (foundEvent) {
      if (dto.title) {
        foundEvent.title = dto.title;
      }

      if (dto.description) {
        foundEvent.description = dto.description;
      }

      if (dto.eventDate) {
        foundEvent.event_date = dto.eventDate;
      }

      if (dto.links) {
        foundEvent.links = dto.links;
      }

      if (dto.reminderDate) {
        foundEvent.reminder_date = dto.reminderDate;
      }

      foundEvent.updatedAt = new Date();

      await this.educationEventRepository.save(foundEvent);

      message = 'Education Event Updated';

      return { message: message, data: foundEvent };
    } else {
      const createData = this.educationEventRepository.create({
        title: dto.title,
        ...(dto.description && {
          description: dto.description,
        }),
        ...(dto.eventDate && { event_date: dto.eventDate }),
        ...(dto.links && { links: dto.links }),
        ...(dto.reminderDate && { reminder_date: dto.reminderDate }),
      });

      await this.educationEventRepository.save(createData);
      message = 'Education Event Created';
      return { message: message, data: createData };
    }
  }

  async findAll() {
    const foundEvents = await this.educationEventRepository.find({
      order: {
        event_date: 'ASC',
      },
      relations: ['comments'],
    });
    if (!foundEvents) {
      throw new BadRequestException('No data found');
    }
    return foundEvents;
  }

  async findOne(id: string) {
    const foundEvent = await this.educationEventRepository.findOne({
      where: {
        id: id,
      },
      relations: ['comments'],
    });
    if (!foundEvent) {
      throw new BadRequestException('No data found');
    }
    return foundEvent;
  }

  async remove(id: string) {
    const deletedEvent = await this.educationEventRepository.delete(id);
    if (!deletedEvent) {
      throw new BadRequestException('No data found');
    }
    return deletedEvent;
  }
}
