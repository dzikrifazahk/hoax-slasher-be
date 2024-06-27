import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NewsCategoryService } from '../services/news-category.service';
import {
  CreateNewsCategoryDtoIn,
  ResponseNewsCategoryDtoOut,
} from '../dto/news-category.dto';
import { BaseDto } from 'src/common/dtos/base.dto';

@ApiTags('News Category')
@Controller('news-category')
export class NewsCategoryController {
  constructor(private readonly newsCategoryService: NewsCategoryService) {}

  @Post('/createOrUpdate')
  @ApiOperation({
    summary: '** Create Or Update ** (ATTENTION PLEASE READ DESCRIPTION)',
    description:
      'Create Or Update news category, Delete (id) from body json for create data || alias_code is optional (remove alias_code from the body if want to send without alias_code)',
  })
  @ApiResponse({
    type: CreateNewsCategoryDtoIn,
  })
  async create(@Body() dto: CreateNewsCategoryDtoIn) {
    const createOrUpdate = await this.newsCategoryService.createOrUpdate(dto);
    return new BaseDto(createOrUpdate.message, createOrUpdate.data);
  }

  @Get('/getAll')
  @ApiOperation({
    summary: 'Get all news category',
    description: 'Get all news category',
  })
  @ApiResponse({
    type: ResponseNewsCategoryDtoOut,
  })
  async findAll() {
    const getAll = await this.newsCategoryService.findAllNewsCategories();

    return new BaseDto('Success Get All News Category', getAll);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get one news category',
    description: 'Get one news category',
  })
  @ApiResponse({
    type: ResponseNewsCategoryDtoOut,
  })
  async findOne(@Param('id') id: string) {
    const getOne = await this.newsCategoryService.findOne(id);
    return new BaseDto('Success Get One news Category', getOne);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete one news category',
    description: 'Delete one news category',
  })
  @ApiResponse({
    type: CreateNewsCategoryDtoIn,
  })
  async delete(@Param('id') id: string) {
    const deleteData = await this.newsCategoryService.delete(id);
    return new BaseDto('Success Delete news Category', deleteData);
  }
}
