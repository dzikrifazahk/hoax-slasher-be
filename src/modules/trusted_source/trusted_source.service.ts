import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrustedSourceDtoIn } from './dto/create-trusted_source.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TrustedSourceEntity } from './entities/trusted_source.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TrustedSourceService {
  constructor(
    @InjectRepository(TrustedSourceEntity)
    private readonly trustedSourceRepository: Repository<TrustedSourceEntity>,
  ) {}

  async createOrUpdate(dto: CreateTrustedSourceDtoIn) {
    const MINIMUM_NAME_LENGTH = 2;
    let message: string;
    console.log('inide', dto.companyName);
    const foundSource = dto.id
      ? await this.trustedSourceRepository.findOne({
          where: {
            id: dto.id,
          },
        })
      : null;

    if (dto.companyName.length < MINIMUM_NAME_LENGTH) {
      throw new BadRequestException(
        `Company name should be at least ${MINIMUM_NAME_LENGTH} characters long`,
      );
    }

    if (foundSource) {
      if (dto.companyName) {
        foundSource.company_name = dto.companyName;
      }

      if (dto.companyDescription) {
        foundSource.company_description = dto.companyDescription;
      }

      if (dto.companyEmail) {
        foundSource.company_email = dto.companyEmail;
      }

      foundSource.updatedAt = new Date();

      await this.trustedSourceRepository.save(foundSource);

      message = 'News Category Updated';

      return { message: message, data: foundSource };
    } else {
      const createData = this.trustedSourceRepository.create({
        company_name: dto.companyName,
        ...(dto.companyDescription && {
          company_description: dto.companyDescription,
        }),
        ...(dto.companyEmail && { company_email: dto.companyEmail }),
      });

      await this.trustedSourceRepository.save(createData);
      message = 'News Category Created';
      return { message: message, data: createData };
    }
  }

  async findAll() {
    const foundSource = await this.trustedSourceRepository.find();

    if (!foundSource) {
      throw new NotFoundException('No News Category Found');
    }

    return foundSource;
  }

  async findOne(id: string) {
    const foundSource = await this.trustedSourceRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!foundSource) {
      throw new NotFoundException('No News Category Found');
    }

    return foundSource;
  }

  async remove(id: string) {
    const foundSource = await this.trustedSourceRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!foundSource) {
      throw new NotFoundException('No News Category Found');
    }

    await this.trustedSourceRepository.remove(foundSource);

    return foundSource;
  }
}
