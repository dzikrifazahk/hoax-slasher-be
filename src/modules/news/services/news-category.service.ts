import { InjectRepository } from '@nestjs/typeorm';
import { NewsCategoryEntity } from '../entities/news-category.entity';
import { Repository } from 'typeorm';
import { CreateNewsCategoryDtoIn } from '../dto/news-category.dto';
import { BadRequestException } from '@nestjs/common';

export class NewsCategoryService {
  constructor(
    @InjectRepository(NewsCategoryEntity)
    private readonly newsCategoryRepository: Repository<NewsCategoryEntity>,
  ) {}

  async createOrUpdate(dto: CreateNewsCategoryDtoIn) {
    const MINIMUM_NAME_LENGTH = 1;
    const MINIMUM_DESC_LENGTH = 5;
    let message: string;
    let saveData: NewsCategoryEntity;

    const findNewsCategory = await this.newsCategoryRepository.findOne({
      where: {
        aliasCode: dto.alias_code,
      },
    });

    console.log('findNewsCategory', findNewsCategory);

    if (findNewsCategory) {
      if (dto.news_category_name) {
        findNewsCategory.newsCategoryName = dto.news_category_name;
      }

      if (dto.news_category_description) {
        findNewsCategory.newsCategoryDescription =
          dto.news_category_description;
      }

      if (dto.alias_code) {
        findNewsCategory.aliasCode = dto.alias_code;
      }

      findNewsCategory.updatedAt = new Date();

      await this.newsCategoryRepository.save(findNewsCategory);

      message = 'News Category Updated';
    } else {
      if (dto.news_category_name.length < MINIMUM_NAME_LENGTH) {
        throw new BadRequestException(
          `news category name should be at least ${MINIMUM_NAME_LENGTH} character long`,
        );
      }

      if (dto.news_category_description.length < MINIMUM_DESC_LENGTH) {
        throw new BadRequestException(
          `news description should be at least ${MINIMUM_DESC_LENGTH} character long`,
        );
      }

      saveData = await this.newsCategoryRepository.create({
        newsCategoryName: dto.news_category_name,
        newsCategoryDescription: dto.news_category_description,
        aliasCode: dto.alias_code,
      });

      await this.newsCategoryRepository.save(saveData);
      message = 'News Category Created';
    }

    const updatedNewsCategory = await this.newsCategoryRepository.findOne({
      where: {
        aliasCode: dto.alias_code,
      },
    });

    return { message: message, data: updatedNewsCategory };
  }

  async getAllNewsCategory() {
    const getAll = await this.newsCategoryRepository
      .createQueryBuilder('news_category')
      .orderBy('LOWER(news_category.news_category_name)', 'ASC')
      .getMany();

    if (!getAll) {
      throw new Error('Error Get News Category');
    }

    return getAll;
  }

  async findOne(id: string) {
    const findNewsCategory = await this.newsCategoryRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!findNewsCategory) {
      throw new Error('Error Get News Category');
    }

    return findNewsCategory;
  }

  async delete(id: string) {
    const findNewsCategory = await this.newsCategoryRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!findNewsCategory) {
      throw new Error('Error Delete News Category');
    }

    await this.newsCategoryRepository.delete({
      id: id,
    });

    return findNewsCategory;
  }
}
