import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { NewsService } from '../services/news.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateNewsDtoIn } from '../dto/news.dto';
import { BaseDto } from 'src/common/dtos/base.dto';

@ApiTags('News')
@Controller('news')
export class NewsNotLabeledController {
  constructor(private readonly newsService: NewsService) {}

  @Post('/')
  @ApiOperation({
    summary: 'Create news not labeled',
    description: 'Create news not labeled',
  })
  @ApiResponse({
    type: CreateNewsDtoIn,
  })
  async create(@Body() dto: CreateNewsDtoIn) {
    const create = await this.newsService.create(dto);
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
  async search(
    @Query('title') title: string,
    @Query('description') description: string,
  ) {
    // TODO: implement searching functionality
    const search = await this.newsService.search(title, description);

    return new BaseDto('Success Get All News Not Labeled', search);
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
    const update = await this.newsService.update(id,dto);
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
