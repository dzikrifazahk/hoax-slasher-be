import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CommunityService } from '../services/community.service';
import { CreateOrUpdateCommunityDtoIn, UpdateCommunityDto } from '../dto/community.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDtoIn, CreateUserDtoOut } from 'src/modules/users/dto/create-user.dto';
import { BaseDto } from 'src/common/dtos/base.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@ApiTags('Community')
@Controller('community')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @Post('/createOrUpdate')
  @ApiOperation({
    summary: '** Create Or Update ** (ATTENTION PLEASE READ DESCRIPTION)',
    description:
      'Create Or Update Community, Delete (id) from body json for create data || required field `name` ',
  })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: CreateUserDtoOut,
  })
  async create(@Body() dto: CreateOrUpdateCommunityDtoIn) {
    const data = await this.communityService.createOrUpdate(dto);
    return new BaseDto(data.message, data.community);
  }

  @Get('/')
  @ApiOperation({
    summary: 'Get all community',
    description: 'Get all community',
  })
  @ApiResponse({
    status: 200,
    description: 'Get all community',
    type: CreateOrUpdateCommunityDtoIn
  })
  async findAll() {
    const getAll = await this.communityService.getAll();
    return new BaseDto('Success Get All Community', getAll);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get one community',
    description: 'Get one community',
  })
  @ApiResponse({
    status: 200,
    description: 'Get one community',
    type: CreateOrUpdateCommunityDtoIn
  })
  async findOne(@Param('id') id: string) {
    const getOne = await this.communityService.findOne(id);
    return new BaseDto('Success Get One Community', getOne);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete one community',
    description: 'Delete one community',
  })
  @ApiResponse({
    status: 200,
    description: 'Delete one community',
    type: CreateOrUpdateCommunityDtoIn
  })
  async remove(@Param('id') id: string) {
    const deleteData = await this.communityService.remove(id);
    return new BaseDto('Success Delete Community', deleteData);
  }
}
