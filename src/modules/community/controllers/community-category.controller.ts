import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  CreateCommunityCategoryDtoIn,
} from '../dto/community-category.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BaseDto } from 'src/common/dtos/base.dto';
import { CommunityCategoryService } from '../services/community-category.service';

@ApiTags('Community Category')
@Controller('community-category')
export class CommunityCategoryController {
  constructor(
    private readonly communityCategoryService: CommunityCategoryService,
  ) {}

  @Post('/')
  @ApiOperation({
    summary: '** Create Or Update ** new community category',
    description:
      'Create Or Update new community category, if update this validate the alias code',
  })
  @ApiResponse({
    type: CreateCommunityCategoryDtoIn,
  })
  async create(@Body() dto: CreateCommunityCategoryDtoIn) {
    const createOrUpdate =
      await this.communityCategoryService.createOrUpdate(dto);
    return new BaseDto(createOrUpdate.message, createOrUpdate.data);
  }

  @Get('/getAll')
  @ApiOperation({
    summary: 'Get all community category',
    description: 'Get all community category',
  })
  @ApiResponse({
    type: CreateCommunityCategoryDtoIn,
  })
  async findAll() {
    const getAll =
      await this.communityCategoryService.getAllCommunityCategory();

    return new BaseDto('Success Get All Community Category', getAll);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get one community category',
    description: 'Get one community category',
  })
  @ApiResponse({
    type: CreateCommunityCategoryDtoIn,
  })
  async findOne(@Param('id') id: string) {
    const getOne = await this.communityCategoryService.findOne(id);
    return new BaseDto('Success Get One Community Category', getOne);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete one community category',
    description: 'Delete one community category',
  })
  @ApiResponse({
    type: CreateCommunityCategoryDtoIn,
  })
  async delete(@Param('id') id: string) {
    const deleteData = await this.communityCategoryService.delete(id);
    return new BaseDto('Success Delete Community Category', deleteData);
  }
}
