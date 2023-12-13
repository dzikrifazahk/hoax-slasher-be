import { Injectable } from '@nestjs/common';
import { CreateDebunkingDtoIn } from './dto/create-debunking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DebunkingEntity } from './entities/debunking.entity';
import { Repository } from 'typeorm';
import { NewsEntity } from '../news/entities/news.entity';

const fs = require('fs-extra');
const REF_IMAGE = 'news';
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
        userId: dto.user_id
      });

    }else {
      throw new Error('Please input evidence image');
    }

    await this.debunkingRepo.save(debunkingCreate);

    return { news: debunkingCreate.id };
  }

  // async update(id: string, dto: CreateDebunkingDtoIn) {
  //   const find = await this.news.findOne({
  //     where: {
  //       id: id,
  //     },
  //   });

  //   if (dto.news_title) {
  //     find.newsTitle = dto.news_title;
  //   }
  //   if (dto.news_description) {
  //     find.newsDescription = dto.news_description;
  //   }
  //   if (dto.news_author) {
  //     find.newsAuthor = dto.news_author;
  //   }
  //   if (dto.news_source) {
  //     find.newsSource = dto.news_source;
  //   }
  //   if (dto.news_publish_date) {
  //     find.newsPublishDate = dto.news_publish_date;
  //   }
  //   if (dto.news_category_id) {
  //     find.newsCategoryId = dto.news_category_id;
  //   }
  //   find.updatedAt = new Date();

  //   find.label = NewsLabel.NOT_TRAINED;
  //   find.isTraining = false;

  //   await this.news.save(find);

  //   return find;
  // }

  // async searchByCategory(id_category: string){
  //   const findCategory = await this.newsCategoryRepo.findOne({
  //     where: {
  //       id: id_category
  //     }
  //   });

  //   console.log('category : ', findCategory)
  //   if(!findCategory){
  //     throw new Error('Category Not Found');
  //   }

  //   const getAll = await this.news.find({
  //     where: {
  //       newsCategoryId: id_category
  //     },
  //     order: {
  //       createdAt: 'DESC'
  //     }
  //   });

  //   console.log('getall : ',getAll)
  //   if (!getAll) {
  //     throw new Error('Error Get News Not Labeled');
  //   }

  //   return getAll;
  // }

  // async findAll() {
  //   const getAll = await this.news.find({
  //     order: {
  //       createdAt: 'DESC',
  //     },
  //     relations: ['newsCategory']
  //   });

  //   if (!getAll) {
  //     throw new Error('Error Get News Not Labeled');
  //   }

  //   return getAll;
  // }

  // async findOne(id: string) {
  //   const findNewsNotLabeled = await this.news.findOne({
  //     where: {
  //       id: id,
  //     },
  //   });

  //   if (!findNewsNotLabeled) {
  //     throw new Error('Error Get News Not Labeled');
  //   }

  //   return findNewsNotLabeled;
  // }

  // async search(title: string, desc: string) {
  //   const getAll = await this.news.find({
  //     [Op.or]: [
  //       { newsTitle: { [Op.like]: `%${title}%` } },
  //       { newsDescription: { [Op.like]: `%${desc}%` } },
  //     ],
  //     order: {
  //       createdAt: 'DESC',
  //     },
  //   });

  //   if (!getAll) {
  //     throw new Error('Error Get News Not Labeled');
  //   }

  //   return getAll;
  // }

  // async delete(id: string) {
  //   const findNewsNotLabeled = await this.news.findOne({
  //     where: {
  //       id: id,
  //     },
  //   });

  //   if (!findNewsNotLabeled) {
  //     throw new Error('Error Get News Not Labeled');
  //   }

  //   await this.news.delete({
  //     id: id,
  //   });

  //   return findNewsNotLabeled;
  // }
}
