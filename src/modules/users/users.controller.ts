import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDtoIn, CreateUserDtoOut } from './dto/create-user.dto';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { BaseDto } from 'src/common/dtos/base.dto';
import { UpdateDtoOutput } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@ApiTags('Users')
@Controller('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create-user')
  @ApiOperation({
    summary: 'Create new user',
    description: 'Create new user',
  })
  @ApiResponse({
    type: CreateUserDtoOut,
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() dto: CreateUserDtoIn,
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
    return await this.usersService.createUser(dto, file);
  }

  @Get('/')
  @ApiOperation({
    summary: 'Get all users',
    description: 'Get all users',
  })
  @ApiResponse({
    type: CreateUserDtoIn,
  })
  async getUsers() {
    const getUsers = await this.usersService.getUsers();
    return new BaseDto('Success Get all users', getUsers);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get one user',
    description: 'Get one user',
  })
  @ApiResponse({
    type: CreateUserDtoIn,
  })
  async findOne(@Param('id') id: string) {
    const getOne = await this.usersService.findOne(id);
    console.log(getOne)
    return new BaseDto('Success Get one user', getOne);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update user',
    description: 'Update user',
  })
  @ApiResponse({
    type: CreateUserDtoOut,
  })
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateDtoOutput,
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
    const updatedata = await this.usersService.updateUser(id, dto, file);
    return new BaseDto('Success Update user', updatedata);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete user',
    description: 'Delete user',
  })
  @ApiResponse({
    type: CreateUserDtoOut,
  })
  async remove(@Param('id') id: string) {
    await this.usersService.deleteUser(id);

    return new BaseDto('Success Delete user', id);
  }
}
