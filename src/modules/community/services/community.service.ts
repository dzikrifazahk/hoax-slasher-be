import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCommunityDtoIn, UpdateCommunityDto } from '../dto/community.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CommunityEntity } from '../entities/community.entity';
import { ILike, Repository } from 'typeorm';
import { CommunityStatus } from 'src/common/enum/enum';

@Injectable()
export class CommunityService {
  constructor(
    @InjectRepository(CommunityEntity)
    private readonly communityRepository: Repository<CommunityEntity>,
  ) {}

  async create(dto: CreateCommunityDtoIn) {
    const MINIMUM_NAME_LENGTH = 1;
    const MINIMUM_DESCRIPTION_LENGTH = 3;

    const findCommunity = await this.communityRepository.findOne({
      where: {
        communityName: ILike(`%${dto.community_name.toLowerCase()}%`),
      },
    });

    if (dto.community_name.length < MINIMUM_NAME_LENGTH) {
      throw new BadRequestException(
        `community name should be at least ${MINIMUM_NAME_LENGTH} character long`,
      );
    }

    if (dto.community_description.length < MINIMUM_DESCRIPTION_LENGTH) {
      throw new BadRequestException(
        `community description should be at least ${MINIMUM_DESCRIPTION_LENGTH} character long`,
      );
    }

    if (findCommunity) {
      throw new BadRequestException('community already registered');
    }

    const newCommunity = this.communityRepository.create({
      communityName: dto.community_name,
      communityDescription: dto.community_description,
      communityAddress: dto.community_address,
      community_category_id: dto.community_category_id,
    });

    await this.communityRepository.save(newCommunity);

    return { communityId: newCommunity.id };
  }

  async getAll() {
    const communities = await this.communityRepository.find({
      where: {
        communityStatus: CommunityStatus.ACTIVE,
      },
      order: {
        createdAt: 'DESC',
      },
    });

    return communities;
  }

  async findOne(id: string) {
    const findCommunity = await this.communityRepository.findOne({
      where: {
        id,
      },
    });

    if (!findCommunity) {
      throw new BadRequestException('community not found');
    }

    return findCommunity;
  }

  async update(id: string, dto: UpdateCommunityDto) {
    const find = await this.communityRepository.findOne({
      where: {
        id: id,
      },
    });
    
    if (!find) {
      throw new BadRequestException('community not found');
    }
    
    const findCommunity = await this.communityRepository.findOne({
      where: {
        id: find.id,
      },
    });
    
    if(dto.community_name) {
      findCommunity.communityName = dto.community_name;
    }

    if(dto.community_description) {
      findCommunity.communityDescription = dto.community_description;
    }

    if(dto.community_address) {
      findCommunity.communityAddress = dto.community_address;
    }

    if(dto.community_status) {
      findCommunity.communityStatus = dto.community_status;
    }

    if(dto.community_category_id) {
      findCommunity.community_category_id = dto.community_category_id;
    }

    findCommunity.updatedAt = new Date();

    await this.communityRepository.save(findCommunity);

    return findCommunity;
  }

  async remove(id: string) {
    const findCommunity = await this.communityRepository.findOne({
      where: {
        id,
      },
    });

    if (!findCommunity) {
      throw new BadRequestException('community not found');
    }

    await this.communityRepository.delete(id);

    return findCommunity;
  }
}
