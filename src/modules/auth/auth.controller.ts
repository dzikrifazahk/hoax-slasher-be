import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DtoOutAuth, LoginDto } from './dto/auth.dto';
import { BaseDto } from 'src/common/dtos/base.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiResponse({ type: LoginDto })
  @ApiOperation({
    summary: 'Login user',
    description: 'Login in for an user and requests from the frontend.',
  })
  async login(
    @Body() dto: LoginDto,
  ) {
    const {token, user} = await this.authService.login(dto.email, dto.password);

    const response: DtoOutAuth = {
      token,
      user,
    };

    return new BaseDto('Succesfully Login', response);
  }
}

