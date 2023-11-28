import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommunityService } from '../services/community.service';
import { CreateCommunityDtoIn, UpdateCommunityDto } from '../dto/community.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDtoIn, CreateUserDtoOut } from 'src/modules/users/dto/create-user.dto';
import { BaseDto } from 'src/common/dtos/base.dto';

@ApiTags('Community')
@Controller('community')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @Post('/create-community')
  @ApiOperation({
    summary: 'Create new community',
    description: 'Create new community',
  })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: CreateUserDtoOut,
  })
  async create(@Body() dto: CreateCommunityDtoIn) {
    return this.communityService.create(dto);
  }

  @Get('/')
  @ApiOperation({
    summary: 'Get all community',
    description: 'Get all community',
  })
  @ApiResponse({
    status: 200,
    description: 'Get all community',
    type: CreateCommunityDtoIn
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
    type: CreateCommunityDtoIn
  })
  async findOne(@Param('id') id: string) {
    const getOne = await this.communityService.findOne(id);
    return new BaseDto('Success Get One Community', getOne);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update one community',
    description: 'Update one community',
  })
  @ApiResponse({
    status: 200,
    description: 'Update one community',
    type: UpdateCommunityDto
  })
  async update(@Param('id') id: string, @Body() updateCommunityDto: UpdateCommunityDto) {
    const updateData = await this.communityService.update(id, updateCommunityDto);
    return new BaseDto('Success Update Community', updateData);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete one community',
    description: 'Delete one community',
  })
  @ApiResponse({
    status: 200,
    description: 'Delete one community',
    type: CreateCommunityDtoIn
  })
  async remove(@Param('id') id: string) {
    const deleteData = await this.communityService.remove(id);
    return new BaseDto('Success Delete Community', deleteData);
  }
}
