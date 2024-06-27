import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserNonAuthDtoIn } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
// import { BaseDto } from 'src/common/dtos/base.dto';
// import { UpdateDtoOutput } from './dto/update-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersNonAuthController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/non-auth/create-user')
  @ApiOperation({
    summary: 'Create new user non auth',
    description: 'Create new user non auth',
  })
  @ApiResponse({
    type: CreateUserNonAuthDtoIn,
  })
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() dto: CreateUserNonAuthDtoIn,
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
    return this.usersService.createUser(dto, file);
  }
}
