import {
  Body,
  Controller,
  Delete,
  Get,
  ParseFilePipe,
  Post,
  UploadedFile,
  MaxFileSizeValidator,
  FileTypeValidator,
  UseInterceptors,
  Param,
  Query,
} from '@nestjs/common';
import { NewsService } from '../services/news.service';
import {
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateNewsDtoIn,
  FindAllNewsDtoIn,
  SearchNewsDto,
  UpdateUrlRequestDtoIn,
  ValidateNewsDtoIn,
} from '../dto/news.dto';
import { BaseDto } from 'src/common/dtos/base.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('News')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post('/createOrUpdate')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({
    summary: 'Create news not labeled',
    description: 'Create news not labeled',
  })
  @ApiResponse({
    type: CreateNewsDtoIn,
  })
  @ApiConsumes('multipart/form-data')
  async create(
    @Body() dto: CreateNewsDtoIn,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
        validators: [
          new MaxFileSizeValidator({ maxSize: 5242880 }), // 5MB (5 * 1024 * 1024)
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|webp)$/ }),
        ],
      }),
    )
    file?: Express.Multer.File,
  ) {
    const data = await this.newsService.createOrUpdate(dto, file);
    return new BaseDto(data.message, data.data);
  }
  
  @Post('/validate-news')
  @ApiOperation({
    summary: 'Validate News',
    description: 'Validate News',
  })
  @ApiResponse({
    type: CreateNewsDtoIn,
  })
  async validateNews(
    @Body() dto: ValidateNewsDtoIn
  ) {
    const data = await this.newsService.validateNews(dto);
    return new BaseDto(data.message, data.data);
  }

  @Get('/getAll')
  @ApiOperation({
    summary: 'Get all news',
    description: 'Get all news',
  })
  @ApiResponse({
    type: CreateNewsDtoIn,
  })
  async findAll(@Query() dto?: FindAllNewsDtoIn) {
    const getAll = await this.newsService.findAll(dto.isValidated);

    return new BaseDto(getAll.message, getAll.data);
  }

  @Get('/countNewsLabel')
  @ApiOperation({
    summary: 'Count News Data With Label',
    description: 'Count News Data With Label',
  })
  @ApiResponse({
    type: CreateNewsDtoIn,
  })
  async countDataWithLabel() {
    const data = await this.newsService.countDataWithLabels();

    return new BaseDto('Success Count Data', data);
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
    const search = await this.newsService.search(dto.title, dto.description, dto.newsCategory);

    return new BaseDto('Success Get All News', search);
  }

  @Post('/updateWithUrlRequest')
  @ApiOperation({
    summary: 'Update news with url request',
    description: 'Update news with url request',
  })
  @ApiResponse({
    type: CreateNewsDtoIn,
  })
  async updateWithUrlRequest(@Body() dto: UpdateUrlRequestDtoIn) {
    const data = await this.newsService.updateWithUrlRequest(dto);
    return new BaseDto(data.message, data.data);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get one news',
    description: 'Get one news',
  })
  @ApiResponse({
    type: CreateNewsDtoIn,
  })
  async findOne(@Param('id') id: string) {
    const data = await this.newsService.findOne(id);
    return new BaseDto('Success Get One News', data);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete one news',
    description: 'Delete one news',
  })
  @ApiResponse({
    type: CreateNewsDtoIn,
  })
  async delete(@Param('id') id: string) {
    const deleteData = await this.newsService.delete(id);
    return new BaseDto('Success Delete News', deleteData);
  }
}
