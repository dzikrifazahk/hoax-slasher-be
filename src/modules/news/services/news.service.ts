import { InjectRepository } from '@nestjs/typeorm';
import { NewsEntity } from '../entities/news.entity';
import { Repository } from 'typeorm';
import { CreateNewsDtoIn } from '../dto/news.dto';
import { NewsLabel } from 'src/common/enum/enum';
const { Op } = require('sequelize');
const fs = require('fs-extra');
const REF_DISPLAY_LOGO = 'news';
import * as path from 'path';

export class NewsService {
  constructor(
    @InjectRepository(NewsEntity)
    private readonly news: Repository<NewsEntity>,
  ) {}

  async create(dto: CreateNewsDtoIn, file?: Express.Multer.File) {
    let newsCreate: NewsEntity;
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
      const filePath = correctedPath2 + '/' + REF_DISPLAY_LOGO + '/' + fileName;
      // console.log('File Path : ', filePath);

      await fs.ensureDir(path.dirname(filePath));

      await fs.promises.writeFile(filePath, buffer);

      // Create the data entry linked to the uploaded file
      newsCreate = this.news.create({
        newsTitle: dto.news_title,
        newsDescription: dto.news_description,
        newsAuthor: dto.news_author,
        newsSource: dto.news_source,
        newsPublishDate: dto.news_publish_date,
        newsCategoryId: dto.news_category_id,
      });

    } else {
      newsCreate = this.news.create({
        newsTitle: dto.news_title,
        newsDescription: dto.news_description,
        newsAuthor: dto.news_author,
        newsSource: dto.news_source,
        newsPublishDate: dto.news_publish_date,
        newsCategoryId: dto.news_category_id,
      });
    }

    await this.news.save(newsCreate);

    return { news: newsCreate.id };
  }

  async update(id: string, dto: CreateNewsDtoIn) {
    const find = await this.news.findOne({
      where: {
        id: id,
      },
    });

    if (dto.news_title) {
      find.newsTitle = dto.news_title;
    }
    if (dto.news_description) {
      find.newsDescription = dto.news_description;
    }
    if (dto.news_author) {
      find.newsAuthor = dto.news_author;
    }
    if (dto.news_source) {
      find.newsSource = dto.news_source;
    }
    if (dto.news_publish_date) {
      find.newsPublishDate = dto.news_publish_date;
    }
    if (dto.news_category_id) {
      find.newsCategoryId = dto.news_category_id;
    }
    find.updatedAt = new Date();

    find.label = NewsLabel.NOT_TRAINED;
    find.isTraining = false;

    await this.news.save(find);

    return find;
  }

  async findAll() {
    const getAll = await this.news.find({
      order: {
        createdAt: 'DESC',
      },
    });

    if (!getAll) {
      throw new Error('Error Get News Not Labeled');
    }

    return getAll;
  }

  async findOne(id: string) {
    const findNewsNotLabeled = await this.news.findOne({
      where: {
        id: id,
      },
    });

    if (!findNewsNotLabeled) {
      throw new Error('Error Get News Not Labeled');
    }

    return findNewsNotLabeled;
  }

  async search(title: string, desc: string) {
    const getAll = await this.news.find({
      [Op.or]: [
        { newsTitle: { [Op.like]: `%${title}%` } },
        { newsDescription: { [Op.like]: `%${desc}%` } },
      ],
      order: {
        createdAt: 'DESC',
      },
    });

    if (!getAll) {
      throw new Error('Error Get News Not Labeled');
    }

    return getAll;
  }

  async delete(id: string) {
    const findNewsNotLabeled = await this.news.findOne({
      where: {
        id: id,
      },
    });

    if (!findNewsNotLabeled) {
      throw new Error('Error Get News Not Labeled');
    }

    await this.news.delete({
      id: id,
    });

    return findNewsNotLabeled;
  }
}
