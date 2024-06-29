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

    const findNewsCategory = dto.id
      ? await this.newsCategoryRepository.findOne({
          where: {
            id: dto.id,
          },
        })
      : null;

    if (findNewsCategory) {
      if (dto.name) {
        findNewsCategory.name = dto.name;
      }

      if (dto.description) {
        findNewsCategory.description = dto.description;
      }

      if (dto.aliasCode) {
        findNewsCategory.alias_code = dto.aliasCode;
      }

      findNewsCategory.updatedAt = new Date();

      await this.newsCategoryRepository.save(findNewsCategory);

      message = 'News Category Updated';
    } else {
      if (dto.name.length < MINIMUM_NAME_LENGTH) {
        throw new BadRequestException(
          `News category name should be at least ${MINIMUM_NAME_LENGTH} character long`,
        );
      }

      if (dto.description.length < MINIMUM_DESC_LENGTH) {
        throw new BadRequestException(
          `News description should be at least ${MINIMUM_DESC_LENGTH} characters long`,
        );
      }

      const createData = this.newsCategoryRepository.create({
        name: dto.name,
        description: dto.description,
        ...(dto.aliasCode && { aliasCode: dto.aliasCode }),
      });

      await this.newsCategoryRepository.save(createData);
      message = 'News Category Created';
    }

    const updatedNewsCategory = await this.newsCategoryRepository.findOne({
      where: {
        alias_code: dto.aliasCode,
      },
    });

    return { message: message, data: updatedNewsCategory };
  }

  async findAllNewsCategories() {
    const allCategories = await this.newsCategoryRepository.find({
      order: {
        name: 'ASC',
      },
    });

    if (!allCategories) {
      throw new Error('Error retrieving news categories');
    }

    return allCategories;
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
