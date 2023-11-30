import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewsLabeledEntity } from '../entities/news-labeled.entity';

@Injectable()
export class NewsLabeledService {
  constructor(
    @InjectRepository(NewsLabeledEntity)
    private readonly newsLabeledRepository: Repository<NewsLabeledEntity>
  ) {}
  // create(createNewsDto: CreateNewsDto) {
  //   return 'This action adds a new news';
  // }

  async findAll() {
    const getAll = await this.newsLabeledRepository.find({
        order: {
            createdAt: 'DESC',
        },
    });
    
    if (!getAll) {
        throw new Error('Error Get News Labeled');
    }

    return getAll;
  }

  async findOne(id: string) {
    const findNewsLabeled =
      await this.newsLabeledRepository.findOne({
        where: {
          id: id,
        },
      });

    if (!findNewsLabeled) {
      throw new Error('Error Get News  Labeled');
    }

    return findNewsLabeled;
  }

  async delete(id: string) {
    const findNewsLabeled =
      await this.newsLabeledRepository.findOne({
        where: {
          id: id,
        },
      });

    if (!findNewsLabeled) {
        throw new Error('Error Get News Labeled');
    }

    await this.newsLabeledRepository.delete({
      id: id,
    });

    return findNewsLabeled;
  }
}
