import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsCategoryEntity } from './entities/news-category.entity';
import { NewsCategoryController } from './controllers/news-category.controller';
import { NewsCategoryService } from './services/news-category.service';
import { NewsNotLabeledController } from './controllers/news.controller';
import { NewsNotLabeledEntity } from './entities/news.entity';
import { NewsService } from './services/news.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      NewsCategoryEntity,
      NewsNotLabeledEntity,
    ]),
  ],
  controllers: [NewsNotLabeledController, NewsCategoryController],
  providers: [NewsCategoryService, NewsService],
})
export class NewsModule {}
