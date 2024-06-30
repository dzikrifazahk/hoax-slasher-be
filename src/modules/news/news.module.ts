import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsCategoryEntity } from './entities/news-category.entity';
import { NewsCategoryController } from './controllers/news-category.controller';
import { NewsCategoryService } from './services/news-category.service';
import { NewsController } from './controllers/news.controller';
import { NewsEntity } from './entities/news.entity';
import { NewsService } from './services/news.service';
import { UrlReqController } from './controllers/url-req.controller';
import { UrlReqService } from './services/url-req.service';
import UrlReqEntity from './entities/url-req.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([NewsCategoryEntity, NewsEntity, UrlReqEntity]),
  ],
  controllers: [NewsController, NewsCategoryController, UrlReqController],
  providers: [NewsCategoryService, NewsService, UrlReqService],
  exports: [NewsCategoryService],
})
export class NewsModule {}
