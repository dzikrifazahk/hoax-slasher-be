import { Injectable } from '@nestjs/common';
import { CreateEventDtoIn } from './dto/dto';
import { EventEntity } from './entities/event.entity';
const fs = require('fs-extra');
const REF_IMAGE = 'news';
import * as path from 'path';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Multer } from 'multer';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepo: Repository<EventEntity>,
  ) {}
  async create(dto: CreateEventDtoIn, file?: Express.Multer.File) {
    let eventCreate: EventEntity;
    console.log('dtocreate', dto);

    if (file) {
      const { originalname, buffer } = file;
      const uploadDirectory = process.env.UPLOADS_DIRECTORY;

      const trimmed = originalname.trim();

      if (!uploadDirectory) {
        throw new Error('uploads directory not found');
      }
      // console.log('uploadDirectory', uploadDirectory);
      const fileName = `${Math.floor(Date.now() / 1000)}-${trimmed}`;
      //  console.log('uploadDirectory', uploadDirectory);
      const correctedPath = uploadDirectory.replace(/\\\\/g, '/');
      //  console.log('corrected Path', correctedPath);
      const correctedPath2 = correctedPath.replace(/\\/g, '/');
      //  console.log('Corrected Path2', correctedPath2);
      //  const filePath = path.join(correctedPath2, REF_ATTACHMENT, fileName);
      const filePath = correctedPath2 + '/' + REF_IMAGE + '/' + fileName;
      // console.log('File Path : ', filePath);

      await fs.ensureDir(path.dirname(filePath));

      await fs.promises.writeFile(filePath, buffer);

      // Create the data entry linked to the uploaded file
      eventCreate = this.eventRepo.create({
        event_title: dto.event_title,
        event_description: dto.event_description,
        event_date: dto.event_date,
        file_path: dto.file_path,
        file_name: dto.file_name,
        is_online: dto.is_online,
        link_meetings: dto.link_meetings,
      });
    } else {
      eventCreate = this.eventRepo.create({});
    }

    eventCreate.createdAt = new Date();

    await this.eventRepo.save(eventCreate);

    return { news: eventCreate.id };
  }

  async update(id: string, dto: CreateEventDtoIn, file?: Express.Multer.File) {
    const find = await this.eventRepo.findOne({
      where: {
        id: id,
      },
    });

    if (dto.event_title) {
      find.event_title = dto.event_title;
    }
    if (dto.event_description) {
      find.event_description = dto.event_description;
    }
    if (dto.event_date) {
      find.event_date = dto.event_date;
    }
    if (dto.is_online) {
      find.is_online = dto.is_online;
    }
    if (dto.link_meetings) {
      find.link_meetings = dto.link_meetings;
    }
    if (file) {
      const { originalname, buffer } = file;
      const uploadDirectory = process.env.UPLOADS_DIRECTORY;

      const trimmed = originalname.trim();

      if (!uploadDirectory) {
        throw new Error('uploads directory not found');
      }
      // console.log('uploadDirectory', uploadDirectory);
      const fileName = `${Math.floor(Date.now() / 1000)}-${trimmed}`;
      //  console.log('uploadDirectory', uploadDirectory);
      const correctedPath = uploadDirectory.replace(/\\\\/g, '/');
      //  console.log('corrected Path', correctedPath);
      const correctedPath2 = correctedPath.replace(/\\/g, '/');
      //  console.log('Corrected Path2', correctedPath2);
      //  const filePath = path.join(correctedPath2, REF_ATTACHMENT, fileName);
      const filePath = correctedPath2 + '/' + REF_IMAGE + '/' + fileName;
      // console.log('File Path : ', filePath);

      await fs.ensureDir(path.dirname(filePath));

      await fs.promises.writeFile(filePath, buffer);

      // Create the data entry linked to the uploaded file
      find.file_name = dto.file_name;
      find.file_path = dto.file_path;
    }
    
    await this.eventRepo.save(find);

    return find;
  }

  async findAll() {
    const getAll = await this.eventRepo.find({
      order: {
        createdAt: 'DESC',
      },
    });

    if (!getAll) {
      throw new Error('Error Get All Event');
    }

    return getAll;
  }

  async findOne(id: string) {
    const find = await this.eventRepo.findOne({
      where: {
        id: id,
      },
    });

    if (!find) {
      throw new Error('Error Get Event');
    }

    return find;
  }

  async delete(id: string) {
    const find = await this.eventRepo.findOne({
      where: {
        id: id,
      },
    });

    if (!find) {
      throw new Error('Error Get News Not Labeled or Nothing');
    }

    await this.eventRepo.delete({
      id: id,
    });

    return find;
  }
}
