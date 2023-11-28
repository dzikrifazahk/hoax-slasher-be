import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserRole } from 'src/common/enum/enum';
import { CreateUserDtoIn } from 'src/modules/users/dto/create-user.dto';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { UsersService } from 'src/modules/users/users.service';
import { DataSource } from 'typeorm';

@Injectable()
export class SeedersService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
    private readonly dataSources: DataSource,
  ) {}
  async seed() {
    // const { userId } = await this.user();
    await this.user();
  }

  async user() {
    const name = this.configService.get('admin.name');
    const email = this.configService.get('admin.email');
    const password = this.configService.get('admin.password');

    const userRepository = this.dataSources.getRepository(UserEntity);

    const foundUser = await userRepository.findOneBy({
      email: email,
    });

    if (foundUser) {
      console.log('user admin already created');
      return { userId: foundUser.id };
    }

    const userObj : CreateUserDtoIn = {
      name,
      email,
      password,
      role: UserRole.ADMIN
    };

    const user = await this.userService.createUser(
     userObj
    );

    return user;
  }
}
