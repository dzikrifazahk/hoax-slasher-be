import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateOrUpdateUrlReqDtoIn {
  @ApiPropertyOptional({
    type: String,
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsString()
  id?: string;

  @ApiProperty({
    type: String,
    example: 'http://www.abc.com',
  })
  @IsString()
  url: string;

  @ApiProperty({
    type: String,
    example: '36722d29-a1a4-4061-935c-66d4f308131b',
  })
  @IsString()
  @IsUUID()
  userId: string;
}

export class ResponseUrlReqDtoOut {
  @ApiPropertyOptional({
    type: String,
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsString()
  id?: string;

  @ApiProperty({
    type: String,
    example: 'http://www.abc.com',
  })
  @IsString()
  url: string;

  @ApiProperty({
    type: String,
    example: '36722d29-a1a4-4061-935c-66d4f308131b',
  })
  @IsString()
  @IsUUID()
  userId: string;
}

export class SendUrlForAnalyzeDtoIn {
  @ApiProperty({
    type: String,
    example: 'http://www.abc.com',
  })
  @IsString()
  url: string;

  @ApiProperty({
    type: String,
    example: '36722d29-a1a4-4061-935c-66d4f308131b',
  })
  @IsString()
  @IsUUID()
  userId: string;
}
