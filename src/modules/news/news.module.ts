import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsCategoryEntity } from './entities/news-category.entity';
import { NewsCategoryController } from './controllers/news-category.controller';
import { NewsCategoryService } from './services/news-category.service';
import { NewsController } from './controllers/news.controller';
import { NewsEntity } from './entities/news.entity';
import { NewsService } from './services/news.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      NewsCategoryEntity,
      NewsEntity,
    ]),
  ],
  controllers: [NewsController, NewsCategoryController],
  providers: [NewsCategoryService, NewsService],
  exports: [NewsCategoryService]
})
export class NewsModule {}
