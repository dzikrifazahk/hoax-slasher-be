import { InjectRepository } from '@nestjs/typeorm';
import { NewsEntity } from '../entities/news.entity';
import { Like, Repository } from 'typeorm';
import { NewsLabel } from 'src/common/enum/enum';
const { Op } = require('sequelize');
const fs = require('fs-extra');
const REF_IMAGE = 'news';
import * as path from 'path';
import { NewsCategoryEntity } from '../entities/news-category.entity';
import { CreateNewsDtoIn, UpdatedPredictDto } from '../dto/news.dto';

export class NewsService {
  constructor(
    @InjectRepository(NewsEntity)
    private readonly news: Repository<NewsEntity>,
    @InjectRepository(NewsCategoryEntity)
    private readonly newsCategoryRepo: Repository<NewsCategoryEntity>,
  ) {}

  async create(dto: CreateNewsDtoIn, file?: Express.Multer.File) {
    let newsCreate: NewsEntity;
    console.log('dtocreate',dto)
    
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
      newsCreate = this.news.create({
        news_title: dto.news_title,
        news_description: dto.news_description,
        news_author: dto.news_author,
        news_source: dto.news_source,
        news_publish_date: dto.news_publish_date,
        newsCategoryId: dto.news_category_id,
        file_name: fileName,
        file_path: filePath,
        label: dto.label
      });
    } else {
      newsCreate = this.news.create({
        news_title: dto.news_title,
        news_description: dto.news_description,
        news_author: dto.news_author,
        news_source: dto.news_source,
        news_publish_date: dto.news_publish_date,
        newsCategoryId: dto.news_category_id,
        label: dto.label
      });
    }

    newsCreate.createdAt = new Date();

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
      find.news_title = dto.news_title;
    }
    if (dto.news_description) {
      find.news_description = dto.news_description;
    }
    if (dto.news_author) {
      find.news_author = dto.news_author;
    }
    if (dto.news_source) {
      find.news_source = dto.news_source;
    }
    if (dto.news_publish_date) {
      find.news_publish_date = dto.news_publish_date;
    }
    if (dto.news_category_id) {
      find.newsCategoryId = dto.news_category_id;
    }
    find.updatedAt = new Date();

    find.label = NewsLabel.NOT_TRAINED;
    find.is_training = false;

    await this.news.save(find);

    return find;
  }

  async updatedPredict(id: string, dto: UpdatedPredictDto) {
    const find = await this.news.findOne({
      where: {
        id: id,
      },
    });
    
    find.label = dto.label;
    find.is_ambiguous = dto.is_ambiguous;
    find.is_training = dto.is_training;
    find.training_date = dto.training_date;
    find.news_emotion = dto.news_emotion;
    find.percentage = dto.percentage;
    find.ambiguous_percentage = dto.ambiguous_percentage;
    
    find.updatedAt = new Date();
    console.log('dtonii' ,dto);
    
    console.log('find' ,find);
    await this.news.save(find);

    return find;
  }

  async findAll() {
    const getAll = await this.news.find({
      order: {
        createdAt: 'DESC',
      },
      relations: ['newsCategory'],
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

  async search(title?: string, desc?: string, id_category?: string) {
    let query: any = {};

    if (title) {
      query = { ...query, news_title: Like(`%${title}%`) };
    }

    if (desc) {
      query = { ...query, news_description: Like(`%${desc}%`) };
    }

    console.log('qyert', query);
    if (id_category) {
      const findCategory = await this.newsCategoryRepo.findOne({
        where: {
          id: id_category,
        },
      });

      console.log('category : ', findCategory);

      if (!findCategory) {
        throw new Error('Category Not Found');
      }

      query = { ...query, newsCategoryId: id_category };
    }

    const getAll = await this.news.find({
      where: query,
      order: {
        createdAt: 'DESC',
      },
      relations: ['newsCategory'],
    });

    console.log('newsAll : ', getAll);

    if (!getAll || getAll.length === 0) {
      throw new Error('Error Get News');
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
      throw new Error('Error Get News Not Labeled or Nothing');
    }

    await this.news.delete({
      id: id,
    });

    return findNewsNotLabeled;
  }
}
