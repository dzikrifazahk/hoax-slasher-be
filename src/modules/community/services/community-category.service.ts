import { InjectRepository } from '@nestjs/typeorm';
import { CreateCommunityCategoryDtoIn } from '../dto/community-category.dto';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CommunityCategoryEntity } from '../entities/community-category.entity';

export class CommunityCategoryService {
  constructor(
    @InjectRepository(CommunityCategoryEntity)
    private readonly communityCategoryRepository: Repository<CommunityCategoryEntity>,
  ) {}

  async createOrUpdate(dto: CreateCommunityCategoryDtoIn) {
    const MINIMUM_COMMUNITY_NAME_LENGTH = 1;
    const MINIMUM_DESC_LENGTH = 5;
    let message: string;
    let saveData: CommunityCategoryEntity;

    const findCommunityCategory =
      await this.communityCategoryRepository.findOne({
        where: {
          aliasCode: dto.alias_code,
        },
      });

    console.log('findCommunityCategory', findCommunityCategory);

    if (findCommunityCategory) {
      if (dto.community_category_name) {
        findCommunityCategory.communityCategoryName =
          dto.community_category_name;
      }

      if (dto.community_category_description) {
        findCommunityCategory.communityCategoryDescription =
          dto.community_category_description;
      }

      if (dto.alias_code) {
        findCommunityCategory.aliasCode = dto.alias_code;
      }

      findCommunityCategory.updatedAt = new Date();

      await this.communityCategoryRepository.save(findCommunityCategory);

      message = 'Community Updated';
    } else {
      if (dto.community_category_name.length < MINIMUM_COMMUNITY_NAME_LENGTH) {
        throw new BadRequestException(
          `community category name should be at least ${MINIMUM_COMMUNITY_NAME_LENGTH} character long`,
        );
      }

      if (dto.community_category_description.length < MINIMUM_DESC_LENGTH) {
        throw new BadRequestException(
          `community description should be at least ${MINIMUM_DESC_LENGTH} character long`,
        );
      }

      saveData = await this.communityCategoryRepository.create({
        communityCategoryName: dto.community_category_name,
        communityCategoryDescription: dto.community_category_description,
        aliasCode: dto.alias_code,
      });

      await this.communityCategoryRepository.save(saveData);
      message = 'Community Created';
    }

    const newCommunityCategory = await this.communityCategoryRepository.findOne(
      {
        where: {
          aliasCode: dto.alias_code,
        },
      },
    );

    return { message: message, data: newCommunityCategory };
  }

  async getAllCommunityCategory() {
    const getAll = await this.communityCategoryRepository
      .createQueryBuilder('community_category')
      .orderBy('LOWER(community_category.community_category_name)', 'ASC')
      .getMany();

    if (!getAll) {
      throw new Error('Error Get Community Category');
    }

    return getAll;
  }

  async findOne(id: string) {
    const findCommunityCategory =
      await this.communityCategoryRepository.findOne({
        where: {
          id: id,
        },
      });

    if (!findCommunityCategory) {
      throw new Error('Error Get Communtiy Category');
    }

    return findCommunityCategory;
  }

  async delete(id: string) {
    const findCommunityCategory =
      await this.communityCategoryRepository.findOne({
        where: {
          id: id,
        },
      });

    if (!findCommunityCategory) {
      throw new Error('Error Delete Community Category');
    }

    await this.communityCategoryRepository.delete({
      id: id,
    });

    return findCommunityCategory;
  }
}
