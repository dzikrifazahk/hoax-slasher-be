import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { NewsNotLabeledService } from '../services/news-not-labeled.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateNewsNotLabeledDtoIn } from '../dto/news-not-labeled.dto';
import { BaseDto } from 'src/common/dtos/base.dto';

@ApiTags('News Not Labeled')
@Controller('news-not-labeled')
export class NewsNotLabeledController {
  constructor(private readonly newsNotLabeledService: NewsNotLabeledService) {}

  @Post('/')
  @ApiOperation({
    summary: 'Create news not labeled',
    description: 'Create news not labeled',
  })
  @ApiResponse({
    type: CreateNewsNotLabeledDtoIn,
  })
  async create(@Body() dto: CreateNewsNotLabeledDtoIn) {
    const create = await this.newsNotLabeledService.create(dto);
    return create;
  }

  @Get('/getAll')
  @ApiOperation({
    summary: 'Get all news not labeled',
    description: 'Get all news not labeled',
  })
  @ApiResponse({
    type: CreateNewsNotLabeledDtoIn,
  })
  async findAll() {
    const getAll = await this.newsNotLabeledService.findAll();

    return new BaseDto('Success Get All News Not Labeled', getAll);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get one news not labeled',
    description: 'Get one news not labeled',
  })
  @ApiResponse({
    type: CreateNewsNotLabeledDtoIn,
  })
  async findOne(@Param('id') id: string) {
    const getOne = await this.newsNotLabeledService.findOne(id);
    return new BaseDto('Success Get One News Not Labeled', getOne);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update one news not labeled',
    description: 'Update one news not labeled',
  })
  @ApiResponse({
    type: CreateNewsNotLabeledDtoIn,
  })
  async update(@Param('id') id: string, @Body() dto: CreateNewsNotLabeledDtoIn) {
    const update = await this.newsNotLabeledService.update(id,dto);
    return new BaseDto('Success Update One News Not Labeled', update);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete one news not labeled',
    description: 'Delete one news not labeled',
  })
  @ApiResponse({
    type: CreateNewsNotLabeledDtoIn,
  })
  async delete(@Param('id') id: string) {
    const deleteData = await this.newsNotLabeledService.delete(id);
    return new BaseDto('Success Delete News Not Labeled', deleteData);
  }
}
