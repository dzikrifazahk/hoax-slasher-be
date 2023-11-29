import { Module } from '@nestjs/common';
import { NewsService } from './services/news.service';
import { NewsController } from './controllers/news.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsCategoryEntity } from './entities/news-category.entity';
import { NewsCategoryController } from './controllers/news-category.controller';
import { NewsCategoryService } from './services/news-category.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      NewsCategoryEntity,
    ]),
  ],
  controllers: [NewsController, NewsCategoryController],
  providers: [NewsService, NewsCategoryService],
})
export class NewsModule {}
