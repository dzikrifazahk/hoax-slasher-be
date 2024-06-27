import { BadRequestException } from '@nestjs/common';
import { CreateUserDtoIn, CreateUserDtoOut } from './dto/create-user.dto';
import { UpdateDtoOutput } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { PasswordHash } from 'src/security/password-hash';
import * as path from 'path';
import fs from 'fs-extra';

const REF_USER_IMAGE = 'user-image';

export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly password: PasswordHash,
  ) {}
  async createUser(
    dto: CreateUserDtoIn,
    file?: Express.Multer.File,
  ): Promise<CreateUserDtoOut> {
    const MINIMUM_NAME_LENGTH = 1;
    const MINIMUM_PASSWORD_LENGTH = 3;
    let newUser: UserEntity;

    dto.email = dto.email.trim();

    if (dto.name.length < MINIMUM_NAME_LENGTH) {
      throw new BadRequestException(
        `username should be at least ${MINIMUM_NAME_LENGTH} character long`,
      );
    }

    if (dto.password.length < MINIMUM_PASSWORD_LENGTH) {
      throw new BadRequestException(
        `password should be at least ${MINIMUM_PASSWORD_LENGTH} character long`,
      );
    }

    const foundEmail = await this.userRepository.findOneBy({
      email: dto.email,
    });

    if (foundEmail != null) {
      throw new BadRequestException('email already registered');
    }

    const encryptedPassword = await this.password.hash(dto.password);

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

      const filePath = correctedPath2 + '/' + REF_USER_IMAGE + '/' + fileName;

      await fs.ensureDir(path.dirname(filePath));

      await fs.promises.writeFile(filePath, buffer);

      newUser = await this.userRepository.create({
        name: dto.name,
        email: dto.email,
        password: encryptedPassword,
        role: dto.role,
        file_path: file.path,
        file_name: file.originalname,
      });
    } else {
      newUser = this.userRepository.create({
        name: dto.name,
        email: dto.email,
        password: encryptedPassword,
        role: dto.role,
      });
    }

    await this.userRepository.save(newUser);

    return { userId: newUser.id };
  }

  async findOne(id: string) {
    const foundUser = await this.userRepository.findOne({
      where: {
        id: id,
      },
      // relations: ['counter'],
    });

    console.log('ketemu ga', foundUser);

    if (!foundUser) {
      return null;
    }

    return foundUser;
  }

  async findOneByEmail(email: string) {
    const foundUser = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });

    if (!foundUser) {
      throw new Error('User not found');
    }

    return foundUser;
  }

  async getUsers() {
    return this.userRepository
      .createQueryBuilder('user')
      .orderBy('LOWER(user.name)', 'ASC') // Change 'DESC' to 'ASC' for ascending order
      .getMany();
  }

  async updateUser(
    id: string,
    dto: UpdateDtoOutput,
    file: Express.Multer.File,
  ) {
    let message: string;

    const find = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!find) {
      throw new Error('Error User not found');
    }

    const findUser = await this.userRepository.findOneBy({
      id: find.id,
    });

    if (dto.name) {
      findUser.name = dto.name;
    }

    if (dto.email) {
      findUser.email = dto.email;
    }

    if (dto.role) {
      findUser.role = dto.role;
    }

    if (dto.needChangePassword) {
      findUser.needChangePassword = dto.needChangePassword;
    }

    if (file) {
      const { originalname, buffer } = file;
      const uploadDirectory = process.env.UPLOADS_DIRECTORY;

      // console.log('originalname : ', originalname);

      const trimmed = originalname.trim();

      if (!uploadDirectory) {
        throw new Error('uploads directory not found');
      }
      // console.log('trimmed : ', trimmed);

      if (findUser.file_path && findUser.file_path.length > 0) {
        // Remove the existing file
        fs.remove(findUser.file_path);
        fs.remove(findUser.file_name);
        findUser.file_path = null;
        findUser.file_name = null;
        message = 'Mengubah foto yang sudah ada';
      }
      if (!findUser.file_name || findUser.file_name.length < 1) {
        const fileName = `${Math.floor(Date.now() / 1000)}-${trimmed}`;
        const correctedPath = uploadDirectory.replace(/\\\\/g, '/');
        const correctedPath2 = correctedPath.replace(/\\/g, '/');
        // const filePath = path.join(correctedPath2, REF_USER_IMAGE, fileName);
        const filePath = correctedPath2 + '/' + REF_USER_IMAGE + '/' + fileName;
        // console.log("Corrected FilePath",filePath);

        await fs.ensureDir(path.dirname(filePath));

        await fs.promises
          .writeFile(filePath, buffer)
          .then(async () => {
            if (findUser) {
              findUser.updated_at = new Date();
              findUser.file_path = filePath;
              findUser.file_name = trimmed;
              await this.userRepository.save(findUser);
            }
            return {
              message: 'Berhasil MenambahkanUpdate Data & Foto',
              filePath,
            };
          })
          .catch(() => {
            throw new Error('Error uploading file');
          });
      }
    }

    // console.log('newUpdatedUser : ', findUser);
    const newUpdatedUser = await this.userRepository.save(findUser);

    return { message: message, data: newUpdatedUser };
  }

  async deleteUser(id: string) {
    const findUser = await this.userRepository.findOneBy({
      id: id,
    });

    if (!findUser) {
      return 'Error User not found';
    }

    await this.userRepository.delete(id);

    return findUser;
  }

  async findOneById(id: string) {
    return this.userRepository.findOne({
      where: {
        id: id,
      },
    });
  }
}
