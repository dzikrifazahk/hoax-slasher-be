import { Module } from '@nestjs/common';
import { CommunityService } from './services/community.service';
import { CommunityController } from './controllers/community.controller';
import { TypeORMError } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommunityEntity } from './entities/community.entity';
import { CommunityCategoryEntity } from './entities/community-category.entity';
import { CommunityCategoryController } from './controllers/community-category.controller';
import { CommunityCategoryService } from './services/community-category.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommunityEntity, CommunityCategoryEntity]),
  ],
  controllers: [CommunityController, CommunityCategoryController],
  providers: [CommunityService, CommunityCategoryService],
})
export class CommunityModule {}
