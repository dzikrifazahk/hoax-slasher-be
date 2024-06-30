import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { DebunkingService } from './debunking.service';
import {
  CreateOrUpdateDebunkingDtoIn,
  ResponseDebunkingDtoOut,
} from './dto/debunking.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { BaseDto } from 'src/common/dtos/base.dto';

@Controller('debunking')
@ApiTags('Debunking')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class DebunkingController {
  constructor(private readonly debunkingService: DebunkingService) {}

  @Post('/createOrUpdate')
  @ApiOperation({
    summary: '** Create Or Update ** (ATTENTION PLEASE READ DESCRIPTION)',
    description:
      'Create Or Update debunking, Delete (id) from body json for create data',
  })
  @ApiResponse({
    type: CreateOrUpdateDebunkingDtoIn,
  })
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() dto: CreateOrUpdateDebunkingDtoIn,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
        validators: [
          new MaxFileSizeValidator({ maxSize: 5242880 }), // 5MB (5 * 1024 * 1024)
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|webp)$/ }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const data = await this.debunkingService.createOrUpdate(dto, file);
    return new BaseDto(data.message, data.data);
  }
  @Get('/')
  @ApiOperation({
    summary: 'Get all debunking data',
    description: 'Get all debunking data',
  })
  @ApiResponse({
    type: ResponseDebunkingDtoOut,
  })
  async getUsers() {
    const getUsers = await this.debunkingService.findAll();
    return new BaseDto('Get all debunking data', getUsers);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get one debunking data',
    description: 'Get one debunking data',
  })
  @ApiResponse({
    type: ResponseDebunkingDtoOut,
  })
  async findOne(@Param('id') id: string) {
    const getOne = this.debunkingService.findOne(id);
    return new BaseDto('Get one debunking data', getOne);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete one user',
    description: 'Delete one user',
  })
  @ApiResponse({
    type: ResponseDebunkingDtoOut,
  })
  async remove(@Param('id') id: string) {
    await this.debunkingService.remove(id);

    return new BaseDto('Delete one user', id);
  }
}
