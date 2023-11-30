import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NewsLabeledService } from '../services/news-labeled.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateNewsLabeledDtoIn } from '../dto/news-labeled.dto';
import { BaseDto } from 'src/common/dtos/base.dto';

@ApiTags('News Labeled')
@Controller('news')
export class NewsLabeledController {
  constructor(private readonly newsLabeledService: NewsLabeledService) {}

  // @Post('/')
  // async create(@Body() createNewsDto: CreateNewsDto) {
  //   return this.newsLabeledService.create(createNewsDto);
  // }

  @Get('/')
  @ApiOperation({
    summary: 'Get all news labeled',
    description: 'Get all news labeled',
  })
  @ApiResponse({
    type: CreateNewsLabeledDtoIn,
  })
  async findAll() {
    const getAll = await this.newsLabeledService.findAll();
    return new BaseDto('Success Get All News Labeled', getAll);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get one news labeled',
    description: 'Get one news labeled',
  })
  @ApiResponse({
    type: CreateNewsLabeledDtoIn,
  })
  async findOne(@Param('id') id: string) {
    const getOne = await this.newsLabeledService.findOne(id);
    return new BaseDto('Success Get One News Labeled', getOne);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto) {
  //   return this.newsLabeledService.update(+id, updateNewsDto);
  // }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete one news labeled',
    description: 'Delete one news labeled',
  })
  @ApiResponse({
    type: CreateNewsLabeledDtoIn,
  })
  async remove(@Param('id') id: string) {
    const deleteNewsLabeled = await this.newsLabeledService.delete(id);
    return new BaseDto('Success Delete News Labeled', deleteNewsLabeled);
  }
}
