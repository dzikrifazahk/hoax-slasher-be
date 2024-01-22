import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDebunkingDtoIn, ValidateDebunkingDto } from './dto/create-debunking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DebunkingEntity } from './entities/debunking.entity';
import { Repository } from 'typeorm';
import { NewsEntity } from '../news/entities/news.entity';

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

  async create(dto: CreateDebunkingDtoIn, file?: Express.Multer.File) {
    let debunkingCreate: DebunkingEntity;
    
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
      debunkingCreate = this.debunkingRepo.create({
        evidence_description: dto.evidence_description,
        evidence_links: dto.evidence_links,
        file_name: fileName,
        file_path: filePath,
        newsId: dto.newsId,
        userId: dto.userId
      });

    }else {
      throw new NotFoundException('Please input evidence image');
    }
    debunkingCreate.createdAt = new Date();
    console.log('debunking ' ,debunkingCreate)
    await this.debunkingRepo.save(debunkingCreate);

    return { news: debunkingCreate.id };
  }

  async update(id: string, dto: CreateDebunkingDtoIn) {
    const find = await this.debunkingRepo.findOne({
      where: {
        id: id,
      },
    });

    if (dto.evidence_description) {
      find.evidence_description = dto.evidence_description;
    }
    if (dto.evidence_links) {
      find.evidence_links = dto.evidence_links;
    }
    if (dto.newsId) {
      find.newsId = dto.newsId;
    }
    if (dto.userId) {
      find.userId = dto.userId;
    }

    find.updatedAt = new Date();

    await this.debunkingRepo.save(find);

    return find;
  }

  async validate(id: string, dto: ValidateDebunkingDto){
    const find = await this.debunkingRepo.findOne({
      where: {
        id: id,
      },
    });

    find.is_validated = dto.is_validated;
    find.validated_date = new Date();
    find.updatedAt = new Date();

    await this.debunkingRepo.save(find);

    return find;
  }

  async findAll() {
    const getAll = await this.debunkingRepo.find({
      order: {
        createdAt: 'DESC',
      },
      relations: ['news', 'user']
    });

    if (!getAll) {
      throw new Error('Error Get Debunking');
    }

    return getAll;
  }

  async findOne(id: string) {
    const findDebunking = await this.debunkingRepo.findOne({
      where: {
        id: id,
      },
    });

    if (!findDebunking) {
      throw new Error('Error Get debunkingRepo');
    }

    return findDebunking;
  }

  async delete(id: string) {
    const findDebunking = await this.debunkingRepo.findOne({
      where: {
        id: id,
      },
    });

    if (!findDebunking) {
      throw new Error('Error Get debunkingRepo');
    }

    await this.debunkingRepo.delete({
      id: id,
    });

    return findDebunking;
  }
}
