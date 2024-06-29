import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrUpdateCommunityDtoIn } from '../dto/community.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CommunityEntity } from '../entities/community.entity';
import { UsersService } from 'src/modules/users/users.service';
import { validate as isUUID } from 'uuid';
import { Repository } from 'typeorm';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs-extra');
const REF_IMAGE = 'community';
import * as path from 'path';

@Injectable()
export class CommunityService {
  constructor(
    @InjectRepository(CommunityEntity)
    private readonly communityRepository: Repository<CommunityEntity>,
    private readonly usersService: UsersService,
  ) {}

  async createOrUpdate(
    dto: CreateOrUpdateCommunityDtoIn,
    file?: Express.Multer.File,
  ) {
    let message: string;

    const foundCommunity = dto.id
      ? await this.communityRepository.findOne({
          where: {
            id: dto.id,
          },
        })
      : null;

    console.log('ketemu', dto);

    if (dto.leader && !isUUID(dto.leader)) {
      throw new BadRequestException('Leader must be a valid UUID');
    }

    if (foundCommunity === null) {
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

        const newCommunity = this.communityRepository.create({
          name: dto.name,
          description: dto.description,
          address: dto.address,
          leader: dto.leader,
          file_name: fileName,
          file_path: filePath,
        });

        await this.communityRepository.save(newCommunity);
        message = 'Success Create With Image';

        return { data: newCommunity, message: message };
      } else {
        const newCommunity = this.communityRepository.create({
          name: dto.name,
          ...(dto.description && { description: dto.description }),
          ...(dto.address && { address: dto.address }),
          ...(dto.leader && { leader: dto.leader }),
        });
        await this.communityRepository.save(newCommunity);

        message = 'Success Create Without Community';

        return { data: newCommunity, message: message };
      }
    } else {
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

        foundCommunity.file_name = fileName;
        foundCommunity.file_path = filePath;
      }

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

      return { data: foundCommunity, message: message };
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
        let fixedLeaderData: object;

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
    let leaderData: object;

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
