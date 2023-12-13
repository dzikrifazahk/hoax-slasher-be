import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  MaxFileSizeValidator,
  FileTypeValidator,
  UseInterceptors,
} from '@nestjs/common';
import { NewsService } from '../services/news.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateNewsDtoIn, SearchNewsDto } from '../dto/news.dto';
import { BaseDto } from 'src/common/dtos/base.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('News')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post('/')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({
    summary: 'Create news not labeled',
    description: 'Create news not labeled',
  })
  @ApiResponse({
    type: CreateNewsDtoIn,
  })
  async create(
    @Body() dto: CreateNewsDtoIn,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 105242880 }), // 100MB
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|mp4|quicktime)$/ }),
        ],
      }),
    )
    file?: Express.Multer.File,
  ) {
    const create = await this.newsService.create(dto, file);
    return create;
  }

  @Get('/getAll')
  @ApiOperation({
    summary: 'Get all news not labeled',
    description: 'Get all news not labeled',
  })
  @ApiResponse({
    type: CreateNewsDtoIn,
  })
  async findAll() {
    const getAll = await this.newsService.findAll();

    return new BaseDto('Success Get All News Not Labeled', getAll);
  }

  @Get('/search')
  @ApiOperation({
    summary: 'Get all news not labeled',
    description: 'Get all news not labeled',
  })
  @ApiResponse({
    type: CreateNewsDtoIn,
  })
  async search(@Query() dto: SearchNewsDto) {
    // TODO: implement searching functionality
    const search = await this.newsService.search(
      dto.news_title,
      dto.news_description,
      dto.newsCategory,
    );

    return new BaseDto('Success Get All News', search);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get one news not labeled',
    description: 'Get one news not labeled',
  })
  @ApiResponse({
    type: CreateNewsDtoIn,
  })
  async findOne(@Param('id') id: string) {
    const getOne = await this.newsService.findOne(id);
    return new BaseDto('Success Get One News Not Labeled', getOne);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update one news not labeled',
    description: 'Update one news not labeled',
  })
  @ApiResponse({
    type: CreateNewsDtoIn,
  })
  async update(@Param('id') id: string, @Body() dto: CreateNewsDtoIn) {
    const update = await this.newsService.update(id, dto);
    return new BaseDto('Success Update One News Not Labeled', update);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete one news not labeled',
    description: 'Delete one news not labeled',
  })
  @ApiResponse({
    type: CreateNewsDtoIn,
  })
  async delete(@Param('id') id: string) {
    const deleteData = await this.newsService.delete(id);
    return new BaseDto('Success Delete News Not Labeled', deleteData);
  }
}
