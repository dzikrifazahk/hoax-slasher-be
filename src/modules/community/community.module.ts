import { Module } from '@nestjs/common';
import { CommunityService } from './services/community.service';
import { CommunityController } from './controllers/community.controller';
import { TypeORMError } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommunityEntity } from './entities/community.entity';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { PasswordHash } from 'src/security/password-hash';
import { UserEntity } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommunityEntity, UserEntity])],
  controllers: [CommunityController],
  providers: [CommunityService, JwtService, PasswordHash, UsersService],
})
export class CommunityModule {}
