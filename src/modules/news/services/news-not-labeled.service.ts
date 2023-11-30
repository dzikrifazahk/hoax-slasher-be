import { InjectRepository } from '@nestjs/typeorm';
import { NewsNotLabeledEntity } from '../entities/news-not-labeled.entity';
import { Repository } from 'typeorm';
import { CreateNewsNotLabeledDtoIn } from '../dto/news-not-labeled.dto';
import { NewsLabel } from 'src/common/enum/enum';

export class NewsNotLabeledService {
  constructor(
    @InjectRepository(NewsNotLabeledEntity)
    private readonly newsNotLabeledRepository: Repository<NewsNotLabeledEntity>,
  ) {}

  async create(dto: CreateNewsNotLabeledDtoIn) {
    const newsNotLabeledCreate = this.newsNotLabeledRepository.create({
      newsTitle: dto.news_title,
      newsDescription: dto.news_description,
      newsAuthor: dto.news_author,
      newsSource: dto.news_source,
      newsPublishDate: dto.news_publish_date,
      newsCategoryId: dto.news_category_id,
    });

    await this.newsNotLabeledRepository.save(newsNotLabeledCreate);

    return { news: newsNotLabeledCreate.id };
  }

  async update(id: string, dto: CreateNewsNotLabeledDtoIn) {
    const find = await this.newsNotLabeledRepository.findOne({
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

    await this.newsNotLabeledRepository.save(find);

    return find;
  }

  async findAll() {
    const getAll = await this.newsNotLabeledRepository.find({
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
    const findNewsNotLabeled =
      await this.newsNotLabeledRepository.findOne({
        where: {
          id: id,
        },
      });

    if (!findNewsNotLabeled) {
      throw new Error('Error Get News Not Labeled');
    }

    return findNewsNotLabeled;
  }

  async delete(id: string) {
    const findNewsNotLabeled =
      await this.newsNotLabeledRepository.findOne({
        where: {
          id: id,
        },
      });

    if (!findNewsNotLabeled) {
        throw new Error('Error Get News Not Labeled');
    }

    await this.newsNotLabeledRepository.delete({
      id: id,
    });

    return findNewsNotLabeled;
  }
}
