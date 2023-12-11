import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TrustedSourceService } from './trusted_source.service';
import { CreateTrustedSourceDtoIn } from './dto/create-trusted_source.dto';
import { UpdateTrustedSourceDto } from './dto/update-trusted_source.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Trusted Source')
@Controller('trusted-source')
export class TrustedSourceController {
  constructor(private readonly trustedSourceService: TrustedSourceService) {}

  @Post('/')
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

  @Get()
  findAll() {
    return this.trustedSourceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trustedSourceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrustedSourceDto: UpdateTrustedSourceDto) {
    return this.trustedSourceService.update(+id, updateTrustedSourceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trustedSourceService.remove(+id);
  }
}
