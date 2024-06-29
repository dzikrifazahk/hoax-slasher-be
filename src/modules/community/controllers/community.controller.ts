import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  UseInterceptors,
} from '@nestjs/common';
import { CommunityService } from '../services/community.service';
import { CreateOrUpdateCommunityDtoIn } from '../dto/community.dto';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDtoOut } from 'src/modules/users/dto/create-user.dto';
import { BaseDto } from 'src/common/dtos/base.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Community')
@Controller('community')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @Post('/createOrUpdate')
  @UseInterceptors(FileInterceptor('file'))
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
  @ApiConsumes('multipart/form-data')
  async create(
    @Body() dto: CreateOrUpdateCommunityDtoIn,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
        validators: [
          new MaxFileSizeValidator({ maxSize: 5242880 }), // 5MB (5 * 1024 * 1024)
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|webp)$/ }),
        ],
      }),
    )
    file?: Express.Multer.File,
  ) {
    console.log('.ini', dto);
    const data = await this.communityService.createOrUpdate(dto, file);
    return new BaseDto(data.message, data.data);
  }

  @Get('/')
  @ApiOperation({
    summary: 'Get all community',
    description: 'Get all community',
  })
  @ApiResponse({
    status: 200,
    description: 'Get all community',
    type: CreateOrUpdateCommunityDtoIn,
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
    type: CreateOrUpdateCommunityDtoIn,
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
    type: CreateOrUpdateCommunityDtoIn,
  })
  async remove(@Param('id') id: string) {
    const deleteData = await this.communityService.remove(id);
    return new BaseDto('Success Delete Community', deleteData);
  }
}
