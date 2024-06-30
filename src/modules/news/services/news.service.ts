import { InjectRepository } from '@nestjs/typeorm';
import { NewsEntity } from '../entities/news.entity';
import { Like, Repository } from 'typeorm';
import { CreateNewsDtoIn, UpdateUrlRequestDtoIn } from '../dto/news.dto';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs-extra');
const REF_IMAGE = 'news';
import * as path from 'path';
import { NewsCategoryEntity } from '../entities/news-category.entity';
import { NotFoundException } from '@nestjs/common';

export class NewsService {
  constructor(
    @InjectRepository(NewsEntity)
    private readonly news: Repository<NewsEntity>,
    @InjectRepository(NewsCategoryEntity)
    private readonly newsCategoryRepo: Repository<NewsCategoryEntity>,
  ) {}

  async createOrUpdate(dto: CreateNewsDtoIn, file?: Express.Multer.File) {
    let message: string;
    console.log(dto);
    if (!dto.id) {
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
        const createdData = this.news.create({
          ...(dto.title && { title: dto.title }),
          ...(dto.description && { description: dto.description }),
          ...(dto.author && { author: dto.author }),
          ...(dto.source && { source: dto.source }),
          ...(dto.publishDate && { publish_date: dto.publishDate }),
          ...(dto.newsKeywords && { news_keywords: dto.newsKeywords }),
          ...(dto.ambigousKeywords && {
            ambigous_keywords: dto.ambigousKeywords,
          }),
          ...(dto.isTraining && { is_training: dto.isTraining }),
          ...(dto.trainingDate && { training_date: dto.trainingDate }),
          ...(dto.label && { label: dto.label }),
          ...(dto.location && { location: dto.location }),
          ...(dto.newsCategoryId && { news_category_id: dto.newsCategoryId }),
          ...(dto.url && { url: dto.url }),
          ...(dto.urlRequestId && { url_request_id: dto.urlRequestId }),
          ...(dto.response && { response: dto.response }),
          file_name: fileName,
          file_path: filePath,
        });
        await this.news.save(createdData);
        message = 'News Created With Image';

        return { message: message, data: createdData };
      } else {
        const createdData = this.news.create({
          ...(dto.title && { title: dto.title }),
          ...(dto.description && { description: dto.description }),
          ...(dto.author && { author: dto.author }),
          ...(dto.source && { source: dto.source }),
          ...(dto.publishDate && { publish_date: dto.publishDate }),
          ...(dto.newsKeywords && { news_keywords: dto.newsKeywords }),
          ...(dto.ambigousKeywords && {
            ambigous_keywords: dto.ambigousKeywords,
          }),
          ...(dto.isTraining && { is_training: dto.isTraining }),
          ...(dto.trainingDate && { training_date: dto.trainingDate }),
          ...(dto.label && { label: dto.label }),
          ...(dto.location && { location: dto.location }),
          ...(dto.newsCategoryId && { news_category_id: dto.newsCategoryId }),
          ...(dto.url && { url: dto.url }),
          ...(dto.urlRequestId && { url_request_id: dto.urlRequestId }),
          ...(dto.response && { response: dto.response }),
        });
        await this.news.save(createdData);
        message = 'News Created Without Image';

        return { message: message, data: createdData };
      }
    } else {
      const foundNews = await this.news.findOne({
        where: {
          id: dto.id,
        },
      });

      if (!foundNews) {
        throw new NotFoundException('News Not Found');
      }

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
        if (dto.title) {
          foundNews.title = dto.title;
        }
        if (dto.description) {
          foundNews.description = dto.description;
        }
        if (dto.author) {
          foundNews.author = dto.author;
        }
        if (dto.source) {
          foundNews.source = dto.source;
        }
        if (dto.publishDate) {
          foundNews.publish_date = dto.publishDate;
        }
        if (dto.newsKeywords) {
          foundNews.news_keywords = dto.newsKeywords;
        }
        if (dto.ambigousKeywords) {
          foundNews.ambigous_keywords = dto.ambigousKeywords;
        }
        if (dto.isTraining) {
          foundNews.is_training = dto.isTraining;
        }
        if (dto.trainingDate) {
          foundNews.training_date = dto.trainingDate;
        }
        if (dto.label) {
          foundNews.label = dto.label;
        }
        if (dto.location) {
          foundNews.location = dto.location;
        }
        if (dto.newsCategoryId) {
          foundNews.news_category_id = dto.newsCategoryId;
        }
        if (dto.url) {
          foundNews.url = dto.url;
        }
        if (dto.urlRequestId) {
          foundNews.url_request_id = dto.urlRequestId;
        }
        if (dto.response) {
          foundNews.response = dto.response;
        }

        foundNews.file_name = fileName;
        foundNews.file_path = filePath;
        foundNews.updatedAt = new Date();

        await this.news.save(foundNews);
        message = 'News Updated With Image';
      } else {
        if (dto.title) {
          foundNews.title = dto.title;
        }
        if (dto.description) {
          foundNews.description = dto.description;
        }
        if (dto.author) {
          foundNews.author = dto.author;
        }
        if (dto.source) {
          foundNews.source = dto.source;
        }
        if (dto.publishDate) {
          foundNews.publish_date = dto.publishDate;
        }
        if (dto.newsKeywords) {
          foundNews.news_keywords = dto.newsKeywords;
        }
        if (dto.ambigousKeywords) {
          foundNews.ambigous_keywords = dto.ambigousKeywords;
        }
        if (dto.isTraining) {
          foundNews.is_training = dto.isTraining;
        }
        if (dto.trainingDate) {
          foundNews.training_date = dto.trainingDate;
        }
        if (dto.label) {
          foundNews.label = dto.label;
        }
        if (dto.location) {
          foundNews.location = dto.location;
        }
        if (dto.newsCategoryId) {
          foundNews.news_category_id = dto.newsCategoryId;
        }
        if (dto.url) {
          foundNews.url = dto.url;
        }
        if (dto.urlRequestId) {
          foundNews.url_request_id = dto.urlRequestId;
        }
        if (dto.response) {
          foundNews.response = dto.response;
        }

        foundNews.updatedAt = new Date();
        await this.news.save(foundNews);
        message = 'News Updated Without Image';
      }
      return { message: message, data: foundNews };
    }
  }

  async updateWithUrlRequest(dto: UpdateUrlRequestDtoIn) {
    let message: string;
    if (!dto.urlRequestId) {
      throw new NotFoundException('Url Request Not Found');
    } else {
      const foundNews = await this.news.findOne({
        where: {
          url_request_id: dto.urlRequestId,
        },
      });

      if (!foundNews) {
        throw new NotFoundException('News Not Found');
      }

      if (dto.title) {
        foundNews.title = dto.title;
      }
      if (dto.description) {
        foundNews.description = dto.description;
      }
      if (dto.author) {
        foundNews.author = dto.author;
      }
      if (dto.source) {
        foundNews.source = dto.source;
      }
      if (dto.publishDate) {
        foundNews.publish_date = dto.publishDate;
      }
      if (dto.newsKeywords) {
        foundNews.news_keywords = dto.newsKeywords;
      }
      if (dto.ambigousKeywords) {
        foundNews.ambigous_keywords = dto.ambigousKeywords;
      }
      if (dto.isTraining) {
        foundNews.is_training = dto.isTraining;
      }
      if (dto.trainingDate) {
        foundNews.training_date = dto.trainingDate;
      }
      if (dto.label) {
        foundNews.label = dto.label;
      }
      if (dto.location) {
        foundNews.location = dto.location;
      }
      if (dto.url) {
        foundNews.url = dto.url;
      }
      if (dto.urlRequestId) {
        foundNews.url_request_id = dto.urlRequestId;
      }

      foundNews.updatedAt = new Date();
      await this.news.save(foundNews);
      message = 'News Updated Without Image';
      return { message: message, data: foundNews };
    }
  }

  async findAll() {
    const getAll = await this.news.find({
      order: {
        updatedAt: 'DESC',
      },
      relations: ['newsCategory'],
    });

    if (!getAll) {
      throw new NotFoundException('News Not Found');
    }
    console.log('ini anu', getAll);
    return getAll;
  }

  async findOne(id: string) {
    const foundNews = await this.news.findOne({
      where: {
        id: id,
      },
      relations: ['newsCategory'],
    });

    if (!foundNews) {
      throw new NotFoundException('News Not Found');
    }

    return foundNews;
  }

  async findByUrlRequestId(id: string) {
    const foundNews = await this.news.find({
      where: {
        url_request_id: id,
      },
      relations: ['newsCategory'],
    });

    if (!foundNews) {
      throw new NotFoundException('News Not Found');
    }

    return foundNews;
  }

  async findOneByUrlRequestId(id: string) {
    const foundNews = await this.news.findOne({
      where: {
        url_request_id: id,
      },
      relations: ['newsCategory'],
    });

    if (!foundNews) {
      throw new NotFoundException('News Not Found');
    }

    return foundNews;
  }

  async search(title?: string, desc?: string, id_category?: string) {
    let query: any = {};

    if (title) {
      query = { ...query, title: Like(`%${title}%`) };
    }

    if (desc) {
      query = { ...query, descrition: Like(`%${desc}%`) };
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

      query = { ...query, news_category_id: id_category };
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

  async countDataWithLabels() {
    const notTrainedCount = await this.news.count({
      where: {
        label: Like('%NOT TRAINED%'),
      },
    });

    const actualCount = await this.news.count({
      where: {
        label: Like('%actual%'),
      },
    });

    const hoaxCount = await this.news.count({
      where: {
        label: Like('%hoax%'),
      },
    });

    const response = {
      notTrained: notTrainedCount,
      actual: actualCount,
      hoax: hoaxCount,
    };

    return response;
  }

  async delete(id: string) {
    const foundNews = await this.news.findOne({
      where: {
        id: id,
      },
    });

    if (!foundNews) {
      throw new NotFoundException('News Not Found');
    }

    await this.news.delete({
      id: id,
    });

    return foundNews;
  }
}
