import { Module } from '@nestjs/common';
import { NewsService } from './services/news.service';
import { NewsController } from './controllers/news.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsCategoryEntity } from './entities/news-category.entity';
import { NewsCategoryController } from './controllers/news-category.controller';
import { NewsCategoryService } from './services/news-category.service';
import { NewsNotLabeledController } from './controllers/news-not-labeled.controller';
import { NewsNotLabeledService } from './services/news-not-labeled.service';
import { NewsNotLabeledEntity } from './entities/news-not-labeled.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      NewsCategoryEntity,
      NewsNotLabeledEntity
    ]),
  ],
  controllers: [NewsController, NewsNotLabeledController, NewsCategoryController],
  providers: [NewsService, NewsNotLabeledService, NewsCategoryService],
})
export class NewsModule {}
