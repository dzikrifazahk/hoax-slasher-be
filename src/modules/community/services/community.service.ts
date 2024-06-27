import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateOrUpdateCommunityDtoIn,
  UpdateCommunityDto,
} from '../dto/community.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CommunityEntity } from '../entities/community.entity';
import { ILike, Repository } from 'typeorm';
import { CommunityStatus } from 'src/common/enum/enum';
import { UsersService } from 'src/modules/users/users.service';
import { validate as isUUID } from 'uuid';

@Injectable()
export class CommunityService {
  constructor(
    @InjectRepository(CommunityEntity)
    private readonly communityRepository: Repository<CommunityEntity>,
    private readonly usersService: UsersService,
  ) {}

  async createOrUpdate(dto: CreateOrUpdateCommunityDtoIn) {
    const MINIMUM_NAME_LENGTH = 2;
    const MINIMUM_DESCRIPTION_LENGTH = 3;
    let message: string;

    const foundCommunity = dto.id
      ? await this.communityRepository.findOne({
          where: {
            id: dto.id,
          },
        })
      : null;

    console.log('ketemu', foundCommunity);
    
    if (dto.leader && !isUUID(dto.leader)) {
      throw new BadRequestException('Leader must be a valid UUID');
    }

    if (dto.name.length < MINIMUM_NAME_LENGTH) {
      throw new BadRequestException(
        `community name should be at least ${MINIMUM_NAME_LENGTH} character long`,
      );
    }

    if (dto.description.length < MINIMUM_DESCRIPTION_LENGTH) {
      throw new BadRequestException(
        `community description should be at least ${MINIMUM_DESCRIPTION_LENGTH} character long`,
      );
    }

    if (!foundCommunity) {
      const newCommunity = this.communityRepository.create({
        name: dto.name,
        ...(dto.description && { description: dto.description }),
        ...(dto.address && { address: dto.address }),
        ...(dto.leader && { leader: dto.leader }),
      });
      await this.communityRepository.save(newCommunity);

      message = 'Success Create Community';

      return { community: newCommunity, message: message };
    } else {
      if (dto.name) {
        foundCommunity.name = dto.name;
      }
      if (dto.description) {
        foundCommunity.description = dto.description;
      }
      if (dto.address) {
        foundCommunity.address = dto.address;
      }
      if (dto.leader) {
        foundCommunity.leader = dto.leader;
      }

      await this.communityRepository.save(foundCommunity);

      message = 'Success Update Community';

      return { community: foundCommunity, message: message };
    }
  }

  async getAll() {
    const communities = await this.communityRepository.find({
      order: {
        updatedAt: 'DESC',
      },
    });

    if (!communities || communities.length === 0) {
      throw new NotFoundException('Community Not Found');
    }

    const finalData = await Promise.all(
      communities.map(async (community) => {
        let fixedLeaderData: Object;

        if (community.leader != null) {
          const leader = await this.usersService.findOne(community.leader);
          fixedLeaderData = {
            id: community.leader,
            name: leader?.name ?? null,
          };
        } else {
          fixedLeaderData = {
            id: community.leader,
            name: null,
          };
        }

        return {
          ...community,
          leader: fixedLeaderData,
        };
      }),
    );

    return finalData;
  }

  async findOne(id: string) {
    let leaderData: Object;

    const foundCommunity = await this.communityRepository.findOne({
      where: { id: id },
    });

    if (!foundCommunity) {
      throw new NotFoundException('Community Not Found');
    }

    if (foundCommunity.leader != null) {
      const foundLeader = await this.usersService.findOne(
        foundCommunity.leader,
      );
      leaderData = {
        id: foundCommunity.leader,
        name: foundLeader?.name ?? null,
      };
    } else {
      leaderData = {
        id: foundCommunity.leader,
        name: null,
      };
    }

    const finalData = {
      ...foundCommunity,
      leader: leaderData,
    };

    return finalData;
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
