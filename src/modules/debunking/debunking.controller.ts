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
  Query,
} from '@nestjs/common';
import { DebunkingService } from './debunking.service';
import {
  CreateOrUpdateDebunkingDtoIn,
  FindByIdDebunkingDtoIn,
  ResponseDebunkingDtoOut,
} from './dto/debunking.dto';
import {
  ApiBearerAuth,
  ApiConsumes,
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
  @ApiConsumes('multipart/form-data')
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
  async getAll() {
    const data = await this.debunkingService.findAll();
    return new BaseDto('Get all debunking data', data);
  }

  @Get('/getById')
  @ApiOperation({
    summary: 'Get one debunking data',
    description: 'Get one debunking data',
  })
  @ApiResponse({
    type: ResponseDebunkingDtoOut,
  })
  async findOne(@Query() dto: FindByIdDebunkingDtoIn) {
    const data = await this.debunkingService.findOne(
      dto.idDebunking,
      dto.idUser,
    );
    return new BaseDto(data.message, data.data);
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
