import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrUpdateDebunkingDtoIn } from './dto/debunking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DebunkingEntity } from './entities/debunking.entity';
import { Repository } from 'typeorm';
import { NewsEntity } from '../news/entities/news.entity';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs-extra');
const REF_IMAGE = 'debunking';
import * as path from 'path';

@Injectable()
export class DebunkingService {
  constructor(
    @InjectRepository(DebunkingEntity)
    private readonly debunkingRepo: Repository<DebunkingEntity>,
    @InjectRepository(NewsEntity)
    private readonly newsRepo: Repository<NewsEntity>,
  ) {}

  async createOrUpdate(dto: CreateOrUpdateDebunkingDtoIn, file?: Express.Multer.File) {
    let message: string;

    const foundDebunking = dto.id
      ? await this.debunkingRepo.findOne({
          where: {
            id: dto.id,
          },
        })
      : null;

    if (!foundDebunking || foundDebunking === null) {
      if (file) {
        const { originalname, buffer } = file;
        const uploadDirectory = process.env.UPLOADS_DIRECTORY;

        const trimmed = originalname.trim();

        if (!uploadDirectory) {
          throw new Error('uploads directory not found');
        }

        const fileName = `${Math.floor(Date.now() / 1000)}-${trimmed}`;
        const correctedPath = uploadDirectory.replace(/\\\\/g, '/');
        const correctedPath2 = correctedPath.replace(/\\/g, '/');
        const filePath = correctedPath2 + '/' + REF_IMAGE + '/' + fileName;

        await fs.ensureDir(path.dirname(filePath));

        await fs.promises.writeFile(filePath, buffer);

        const createDebunkingData = this.debunkingRepo.create({
          reason: dto.reason,
          evidence_links: dto.evidenceLinks,
          file_name: fileName,
          file_path: filePath,
          newsId: dto.newsId,
          userId: dto.userId,
        });

        message = 'Success Create Debunking With Image';
        await this.debunkingRepo.save(createDebunkingData);

        return { message: message, data: createDebunkingData };
      } else {
        throw new Error('Please input evidence image');
      }
    } else {
      if (file) {
        const { originalname, buffer } = file;
        const uploadDirectory = process.env.UPLOADS_DIRECTORY;

        const trimmed = originalname.trim();

        if (!uploadDirectory) {
          throw new Error('uploads directory not found');
        }

        const fileName = `${Math.floor(Date.now() / 1000)}-${trimmed}`;
        const correctedPath = uploadDirectory.replace(/\\\\/g, '/');
        const correctedPath2 = correctedPath.replace(/\\/g, '/');
        const filePath = correctedPath2 + '/' + REF_IMAGE + '/' + fileName;

        await fs.ensureDir(path.dirname(filePath));

        await fs.promises.writeFile(filePath, buffer);

        if (dto.reason) {
          foundDebunking.reason = dto.reason;
        }
        if (dto.evidenceLinks) {
          foundDebunking.evidence_links = dto.evidenceLinks;
        }
        if (dto.newsId) {
          foundDebunking.newsId = dto.newsId;
        }
        if (dto.userId) {
          foundDebunking.userId = dto.userId;
        }

        message = 'Success Create Debunking With Image';
        await this.debunkingRepo.save(foundDebunking);

        return { message: message, data: foundDebunking };
      } else {
        if (dto.reason) {
          foundDebunking.reason = dto.reason;
        }
        if (dto.evidenceLinks) {
          foundDebunking.evidence_links = dto.evidenceLinks;
        }
        if (dto.newsId) {
          foundDebunking.newsId = dto.newsId;
        }
        if (dto.userId) {
          foundDebunking.userId = dto.userId;
        }

        message = 'Success Create Debunking With Image';
        await this.debunkingRepo.save(foundDebunking);

        return { message: message, data: foundDebunking };
      }
    }
  }

  async findOne(id: string) {
    const foundDebunking = await this.debunkingRepo.findOne({
      where: {
        id: id,
      },
      relations: ['news'],
    });

    if (!foundDebunking) {
      throw new NotFoundException('Debunking Data Not Found');
    }

    return foundDebunking;
  }

  async findAll() {
    const foundDebunking = await this.debunkingRepo.find({
      order: {
        updatedAt: 'DESC',
      },
      relations: ['news'],
    });
    if (!foundDebunking) {
      throw new NotFoundException('Debunking Data Not Found');
    }
    return foundDebunking;
  }

  async remove(id: string) {
    const foundDebunking = await this.debunkingRepo.findOne({
      where: {
        id: id,
      },
    });
    if (!foundDebunking) {
      throw new NotFoundException('Debunking Data Not Found');
    }
    await this.debunkingRepo.remove(foundDebunking);
    return { message: 'Success Delete Debunking' };
  }
}
