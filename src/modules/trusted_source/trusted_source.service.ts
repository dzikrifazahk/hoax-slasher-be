import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTrustedSourceDtoIn } from './dto/create-trusted_source.dto';
import { UpdateTrustedSourceDto } from './dto/update-trusted_source.dto';
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
    const MINIMUM_NAME_LENGTH = 1;
    const MINIMUM_DESC_LENGTH = 5;
    let message: string;
    let saveData: TrustedSourceEntity;

    const findSourceName = await this.trustedSourceRepository
      .createQueryBuilder('trusted_source')
      .orderBy('LOWER(trusted_source.company_name)', 'ASC')
      .getOne();

    console.log('findSourceName', findSourceName);

    if (findSourceName) {
      if (dto.company_name) {
        findSourceName.company_name = dto.company_name;
      }

      if (dto.company_description) {
        findSourceName.company_description =
          dto.company_description;
      }

      if (dto.company_email) {
        findSourceName.company_email = dto.company_email;
      }

      findSourceName.updatedAt = new Date();

      await this.trustedSourceRepository.save(findSourceName);

      message = 'News Category Updated';
    } else {
      if (dto.company_name.length < MINIMUM_NAME_LENGTH) {
        throw new BadRequestException(
          `news category name should be at least ${MINIMUM_NAME_LENGTH} character long`,
        );
      }

      if (dto.company_description.length < MINIMUM_DESC_LENGTH) {
        throw new BadRequestException(
          `news description should be at least ${MINIMUM_DESC_LENGTH} character long`,
        );
      }

      saveData = await this.trustedSourceRepository.create({
        company_name: dto.company_name,
        company_description: dto.company_description,
        company_email: dto.company_email,
      });

      await this.trustedSourceRepository.save(saveData);
      message = 'News Category Created';
    }

    // const updatedNewsCategory = await this.trustedSourceRepository.findOne({
    //   where: {
    //     aliasCode: dto.alias_code,
    //   },
    // });

    return { message: message, data: saveData };
  }

  findAll() {
    return `This action returns all trustedSource`;
  }

  findOne(id: number) {
    return `This action returns a #${id} trustedSource`;
  }

  update(id: number, updateTrustedSourceDto: UpdateTrustedSourceDto) {
    return `This action updates a #${id} trustedSource`;
  }

  remove(id: number) {
    return `This action removes a #${id} trustedSource`;
  }
}
