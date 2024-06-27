import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateEducationEventDtoIn {
  @ApiPropertyOptional({
    type: String,
    example: '388129-12883-asjdasdn-2',
  })
  @IsOptional()
  @IsString()
  id?: string;

  @ApiProperty({
    type: String,
    example: 'event title',
  })
  @IsString()
  title: string;

  @ApiProperty({
    type: String,
    example: 'event description',
  })
  @IsString()
  description: string;

  @ApiProperty({
    type: Date,
    example: '2024-06-26T13:15:48.683Z',
  })
  @IsString()
  eventDate: Date;

  @ApiPropertyOptional({
    type: Boolean,
    example: 'is online (nullable)',
  })
  @IsString()
  @IsOptional()
  isOnline?: boolean;

  @ApiPropertyOptional({
    type: String,
    example: 'event link (nullable)',
  })
  @IsString()
  @IsOptional()
  links?: string;

  @ApiPropertyOptional({
    type: Date,
    example: 'event reminder date (nullable)',
  })
  @IsString()
  @IsOptional()
  reminderDate?: Date;

  @ApiPropertyOptional({
    type: String,
    example: '/usr/local/abc.png (nullable)',
  })
  @IsString()
  filePath?: string;

  @ApiPropertyOptional({
    type: String,
    example: 'abc.png (nullable)',
  })
  @IsString()
  fileName?: string;
}

export class EducationEventResponseDtoOut {
  @ApiProperty({
    type: String,
    example: 'event title',
  })
  @IsString()
  title: string;

  @ApiProperty({
    type: String,
    example: 'event description',
  })
  @IsString()
  description: string;

  @ApiProperty({
    type: String,
    example: '2024-06-26T13:15:48.683Z',
  })
  @IsString()
  eventDate: string;

  @ApiPropertyOptional({
    type: String,
    example: 'event link',
  })
  @IsString()
  @IsOptional()
  links?: string;

  @ApiPropertyOptional({
    type: String,
    example: 'event reminder date',
  })
  @IsString()
  @IsOptional()
  reminderDate?: string;

  @ApiPropertyOptional({
    type: String,
    example: '/usr/local/abc.png',
  })
  @IsString()
  filePath?: string;

  @ApiPropertyOptional({
    type: String,
    example: 'abc.png',
  })
  @IsString()
  fileName?: string;
}
