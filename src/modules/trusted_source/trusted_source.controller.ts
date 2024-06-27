import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { TrustedSourceService } from './trusted_source.service';
import { CreateTrustedSourceDtoIn } from './dto/create-trusted_source.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BaseDto } from 'src/common/dtos/base.dto';

@ApiTags('Trusted Source')
@Controller('trusted-source')
export class TrustedSourceController {
  constructor(private readonly trustedSourceService: TrustedSourceService) {}

  @Post('/createOrUpdate')
  @ApiOperation({
    summary: '** Create Or Update ** new trusted source',
    description:
      'Create Or Update new trusted source, if update this validate the alias code',
  })
  @ApiResponse({
    type: CreateTrustedSourceDtoIn,
  })
  async create(@Body() dto: CreateTrustedSourceDtoIn) {
    const createOrUpdate = await this.trustedSourceService.createOrUpdate(dto);
    return createOrUpdate;
  }

  @Get('/')
  @ApiOperation({
    summary: 'Get all trusted source data',
    description: 'Get all trusted source data',
  })
  @ApiResponse({
    type: CreateTrustedSourceDtoIn,
  })
  async findAll() {
    const data = await this.trustedSourceService.findAll();
    return new BaseDto('Success Get All Trusted Source Data', data);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get One trusted source data',
    description: 'Get One trusted source data',
  })
  @ApiResponse({
    type: CreateTrustedSourceDtoIn,
  })
  async findOne(@Param('id') id: string) {
    const data = await this.trustedSourceService.findOne(id);
    return new BaseDto('Success Get One Trusted Source Data', data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.trustedSourceService.remove(id);
    return new BaseDto('Success Delete Trusted Source Data', data);
  }
}
