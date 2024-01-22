import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  UploadedFile,
} from '@nestjs/common';
import { DebunkingService } from './debunking.service';
import { ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateDebunkingDtoIn, ValidateDebunkingDto } from './dto/create-debunking.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { BaseDto } from 'src/common/dtos/base.dto';

@ApiTags('Debunking')
@Controller('debunking')
export class DebunkingController {
  constructor(private readonly debunkingService: DebunkingService) {}

  @Post('/')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({
    summary: 'Create debunking',
    description: 'Create debunking',
  })
  @ApiResponse({
    type: CreateDebunkingDtoIn,
  })
  async create(
    @Body() dto: CreateDebunkingDtoIn,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 105242880 }), // 100MB
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|mp4|quicktime)$/ }),
        ],
      }),
    )
    file?: Express.Multer.File,
  ) {
    const create = await this.debunkingService.create(dto, file);
    return create;
  }

  @Get('/getAll')
  @ApiOperation({
    summary: 'getAll Data debunking',
    description: 'getAll Data debunking',
  })
  @ApiResponse({
    type: CreateDebunkingDtoIn,
  })
  async findAll() {
    const getAll = await this.debunkingService.findAll();
    return new BaseDto('Success Get Data', getAll);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get One Data By Id debunking',
    description: 'Get One Data By Id debunking',
  })
  @ApiResponse({
    type: CreateDebunkingDtoIn,
  })
  async findOne(@Param('id') id: string) {
    const findOneDebunking = await this.debunkingService.findOne(id);
    return new BaseDto('Success Get One Data', findOneDebunking);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update Data debunking',
    description: 'Update Data debunking',
  })
  @ApiResponse({
    type: CreateDebunkingDtoIn
  })
  async update(@Param('id') id: string, @Body() updateDebunkingDto: CreateDebunkingDtoIn) {
    return this.debunkingService.update(id, updateDebunkingDto);
  }

  @Patch('/validate/:id')
  @ApiOperation({
    summary: 'validate Data debunking',
    description: 'validate Data debunking',
  })
  async validate(@Param('id') id: string, @Body() dto: ValidateDebunkingDto) {
    return this.debunkingService.validate(id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete Data debunking',
    description: 'Delete Data debunking',
  })
  @ApiResponse({
    type: CreateDebunkingDtoIn,
  })
  async remove(@Param('id') id: string) {
    const deleted = await this.debunkingService.delete(id);
    return new BaseDto('Success Delete Data', deleted);
  }
}
