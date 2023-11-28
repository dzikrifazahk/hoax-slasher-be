import { Injectable } from '@nestjs/common';
import { CreateCommunityDto } from '../dto/community.dto';
import { UpdateCommunityDto } from '../dto/community-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CommunityEntity } from '../entities/community.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommunityService {
  constructor(
    @InjectRepository(CommunityEntity)
    private readonly userRepository:  Repository<CommunityEntity>,
  ) {}

  async create(dto: CreateCommunityDto) {
    const MINIMUM_NAME_LENGTH = 1;
    const MINIMUM_PASSWORD_LENGTH = 3;
    
    // dto.email = dto.email.trim();

    // if (dto.name.length < MINIMUM_NAME_LENGTH) {
    //   throw new BadRequestException(
    //     `username should be at least ${MINIMUM_NAME_LENGTH} character long`,
    //   );
    // }

    // if (dto.password.length < MINIMUM_PASSWORD_LENGTH) {
    //   throw new BadRequestException(
    //     `password should be at least ${MINIMUM_PASSWORD_LENGTH} character long`,
    //   );
    // }

    // const foundEmail = await this.userRepository.findOneBy({
    //   email: dto.email,
    // });

    // if (foundEmail != null) {
    //   throw new BadRequestException('email already registered');
    // }

    // const encryptedPassword = await this.password.hash(dto.password);

    // const newUser = this.userRepository.create({
    //   name: dto.name,
    //   email: dto.email,
    //   password: encryptedPassword,
    //   level: dto.level,
    // });

    // await this.userRepository.save(newUser);

    // return { userId: newUser.id_user };
  }

  findAll() {
    return `This action returns all community`;
  }

  findOne(id: number) {
    return `This action returns a #${id} community`;
  }

  update(id: number, updateCommunityDto: UpdateCommunityDto) {
    return `This action updates a #${id} community`;
  }

  remove(id: number) {
    return `This action removes a #${id} community`;
  }
}
