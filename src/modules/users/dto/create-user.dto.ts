import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from 'src/common/enum/enum';

export class CreateUserDtoIn {
  @ApiProperty({
    type: String,
    required: true,
    example: 'Dzikri Faza',
  })
  name: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'dzikri@gmail.com',
  })
  email: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'qwe2rtyu',
  })
  password: string;

  @ApiProperty({
    type: String,
    isArray: true,
    required: true,
    example: ['ADMIN', 'NEWS_REVIERWER', 'COMMUNITY_ADMIN', 'USER_GENERAL'],
  })
  role: UserRole;

  @ApiPropertyOptional({ type: 'string', format: 'binary', required: false })
  file?: any;
}

export class CreateUserNonAuthDtoIn {
  @ApiProperty({
    type: String,
    required: true,
    example: 'Dzikri Faza',
  })
  name: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'dzikri@gmail.com',
  })
  email: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'qwe2rtyu',
  })
  password: string;

  @ApiProperty({
    type: String,
    isArray: true,
    required: true,
    example: 'USER_GENERAL',
  })
  role: UserRole.USER_GENERAL;

  @ApiProperty({
    type: String,
    nullable: true,
    example: 'user/folder',
  })
  filePath?: string;

  @ApiProperty({
    type: String,
    nullable: true,
    example: 'user/file.png',
  })
  fileName?: string;
}

export class CreateUserDtoOut {
  @ApiProperty()
  userId: string;
}
