import { InjectRepository } from '@nestjs/typeorm';
import UrlReqEntity from '../entities/url-req.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import {
  CreateOrUpdateUrlReqDtoIn,
  SendUrlForAnalyzeDtoIn,
} from '../dto/url-req.dto';
import { NewsService } from './news.service';

export class UrlReqService {
  constructor(
    @InjectRepository(UrlReqEntity)
    private readonly urlReqRepository: Repository<UrlReqEntity>,
    private readonly newsService: NewsService,
  ) {}

  async createOrUpdate(dto: CreateOrUpdateUrlReqDtoIn) {
    let message: string;
    const foundUrlReq = dto.id
      ? await this.urlReqRepository.findOne({
          where: {
            id: dto.id,
          },
        })
      : null;

    if (foundUrlReq) {
      if (dto.url) {
        foundUrlReq.url = dto.url;
      }

      if (dto.userId) {
        foundUrlReq.user_id = dto.userId;
      }
      foundUrlReq.updatedAt = new Date();
      message = 'Url Request Updated';

      await this.urlReqRepository.save(foundUrlReq);

      return { message: message, data: foundUrlReq };
    } else {
      const createData = this.urlReqRepository.create({
        url: dto.url,
        user_id: dto.userId,
      });

      message = 'Url Request Created';
      await this.urlReqRepository.save(createData);
      return { message: message, data: createData };
    }
  }

  async sendUrlForAnalyze(dto: SendUrlForAnalyzeDtoIn) {
    const saveUrl = await this.createOrUpdate(dto);
    let message: string;

    if (!saveUrl) {
      throw new NotFoundException('Gagal menyimpan data url');
    } else {
      const idUrlReq = saveUrl.data.id;
      const url = saveUrl.data.url;

      message = 'Sending Url Success Created';
      const createDataNews = await this.newsService.createOrUpdate({
        url: url,
        urlRequestId: idUrlReq,
      });

      const responseData = {
        url: createDataNews.data.url,
        urlRequestId: createDataNews.data.url_request_id,
      };

      return { message: message, data: responseData };
    }
  }

  async findUrlRequestByUserId(userId: string) {
    console.log('uida', userId);
    const foundUrlReq = await this.urlReqRepository.find({
      where: {
        user_id: userId,
      },
    });

    if (!foundUrlReq) {
      throw new NotFoundException('Url Request Not Found');
    }

    const mappedData = await Promise.all(
      foundUrlReq.map(async (item) => {
        const idUrlReq = item.id;
        const foundNews = await this.newsService.findByUrlRequestId(idUrlReq);

        const newsData = foundNews.length > 0 ? foundNews[0] : null;

        return {
          ...item,
          news: newsData,
        };
      }),
    );

    if (!mappedData) {
      throw new NotFoundException('News With Url Request Not Found');
    }
    return mappedData;
  }

  async findOne(id: string) {
    const foundUrlReq = await this.urlReqRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!foundUrlReq) {
      throw new NotFoundException('Url Request Not Found');
    }
    return foundUrlReq;
  }

  async findAll() {
    const foundUrlReq = await this.urlReqRepository.find();
    if (!foundUrlReq) {
      throw new NotFoundException('No data found');
    }
    return foundUrlReq;
  }

  async delete(id: string) {
    const foundUrlReq = await this.urlReqRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!foundUrlReq) {
      throw new NotFoundException('Url Request Not Found');
    }
    await this.urlReqRepository.delete(id);
  }
}
