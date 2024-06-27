import { ApiProperty } from '@nestjs/swagger';

export class UserObject {
  id: string;
  role: string;
}

export class DtoOutAuth {
  @ApiProperty({
    type: String,
    required: true,
    example: 'JWT',
  })
  token: string;

  @ApiProperty({
    type: UserObject,
    required: true,
    example: 'UUID',
  })
  user: UserObject;
}

export class LoginDto {
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
}
