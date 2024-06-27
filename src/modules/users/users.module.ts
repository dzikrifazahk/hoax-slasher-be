import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { PasswordHash } from 'src/security/password-hash';
import { JwtService } from '@nestjs/jwt';
import { UsersNonAuthController } from './users-non-auth.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController, UsersNonAuthController],
  providers: [UsersService, PasswordHash, JwtService],
  exports: [TypeOrmModule, UsersService],
})
export class UsersModule {}
