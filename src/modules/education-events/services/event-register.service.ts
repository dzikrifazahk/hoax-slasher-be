import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrUpdateDtoIn } from '../dto/event-comments.dto';
import { EventRegisterEntity } from '../entities/event-register.entity';

@Injectable()
export class EventRegisterService {
  constructor(
    @InjectRepository(EventRegisterEntity)
    private readonly eventRegisterRepository: Repository<EventRegisterEntity>,
  ) {}

  async createOrUpdate(dto: CreateOrUpdateDtoIn) {
    let message: string;
    const founEventRegister = dto.id
      ? await this.eventRegisterRepository.findOne({
          where: {
            id: dto.id,
          },
        })
      : null;

    if (founEventRegister) {
      if (dto.educationEventId) {
        founEventRegister.educationEvent = dto.educationEventId;
      }

      if (dto.userId) {
        founEventRegister.user = dto.userId;
      }

      founEventRegister.updatedAt = new Date();

      await this.eventRegisterRepository.save(founEventRegister);

      message = 'Event Register Updated';

      return { message: message, data: founEventRegister };
    } else {
      const createData = this.eventRegisterRepository.create({
        educationEvent: dto.educationEventId,
        user: dto.userId,
      });

      await this.eventRegisterRepository.save(createData);
      message = 'Event Register Created';
      return { message: message, data: createData };
    }
  }

  async findAll() {
    const foundEventRegister = await this.eventRegisterRepository.find({
      order: {
        updatedAt: 'DESC',
      },
      relations: ['educationEvent', 'user'],
    });
    if (!foundEventRegister) {
      throw new NotFoundException('No data found');
    }
    return foundEventRegister;
  }

  async findOne(id: string) {
    const founEventRegister = await this.eventRegisterRepository.findOne({
      where: {
        id: id,
      },
      relations: ['educationEvent', 'user'],
    });
    if (!founEventRegister) {
      throw new NotFoundException('No data found');
    }
    return founEventRegister;
  }

  async remove(id: string) {
    const deletedEvent = await this.eventRegisterRepository.delete(id);
    if (!deletedEvent) {
      throw new NotFoundException('No data found');
    }
    return deletedEvent;
  }
}
