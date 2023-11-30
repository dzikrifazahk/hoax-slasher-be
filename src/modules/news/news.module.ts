import { Module } from '@nestjs/common';
import { NewsLabeledService } from './services/news-labeled.service';
import { NewsLabeledController } from './controllers/news-labeled.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsCategoryEntity } from './entities/news-category.entity';
import { NewsCategoryController } from './controllers/news-category.controller';
import { NewsCategoryService } from './services/news-category.service';
import { NewsNotLabeledController } from './controllers/news-not-labeled.controller';
import { NewsNotLabeledService } from './services/news-not-labeled.service';
import { NewsNotLabeledEntity } from './entities/news-not-labeled.entity';
import { NewsLabeledEntity } from './entities/news-labeled.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      NewsCategoryEntity,
      NewsNotLabeledEntity,
      NewsLabeledEntity
    ]),
  ],
  controllers: [NewsLabeledController, NewsNotLabeledController, NewsCategoryController],
  providers: [NewsLabeledService, NewsNotLabeledService, NewsCategoryService],
})
export class NewsModule {}
