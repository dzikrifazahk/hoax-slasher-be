import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateNewsDtoIn {
  @ApiPropertyOptional({
    type: String,
    example: 'a0b0b5f9-7c4c-4d4c-8d8c-8d8c8d8c8d8c',
  })
  @IsUUID()
  @IsOptional()
  id?: string;

  @ApiPropertyOptional({
    type: String,
    example: 'News Title',
  })
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    type: String,
    example: 'News Description',
  })
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    type: String,
    example: 'Dzikri Faza',
  })
  @IsString()
  author?: string;

  @ApiPropertyOptional({
    type: String,
    example: 'Narasi',
  })
  @IsString()
  source?: string;

  @ApiPropertyOptional({
    type: Date,
    example: '2023-11-28 19:30:43.934129',
  })
  @IsDate()
  publishDate?: Date;

  @ApiPropertyOptional({
    type: String,
    example: 'Mengadakan, Berita, Alkaline',
  })
  @IsString()
  newsKeywords?: string;

  @ApiPropertyOptional({
    type: String,
    example: 'Incar, Masa De, Kta',
  })
  @IsString()
  ambigousKeywords?: string;

  @ApiPropertyOptional({
    type: Boolean,
    example: false,
  })
  @IsBoolean()
  isTraining?: boolean;

  @ApiPropertyOptional({
    type: Date,
    example: '2023-11-28 19:30:43.934129',
  })
  @IsDate()
  trainingDate?: Date;

  @ApiPropertyOptional({
    type: String,
    example: 'NOT TRAINED | HOAX | AKTUAL',
  })
  @IsString()
  label?: string;

  @ApiPropertyOptional({
    type: String,
    example: 'Bandung',
  })
  @IsString()
  location?: string;

  @ApiPropertyOptional({
    type: String,
    example: '3c143ad2-6d70-4053-a0ae-82311b7a9d6a',
  })
  @IsString()
  newsCategoryId?: string;

  @ApiPropertyOptional({
    type: String,
    example: 'https://narasi.tv/read/narasi-daily/harga-gift-tiktok',
  })
  @IsString()
  url?: string;

  @ApiPropertyOptional({
    type: String,
    example: '3c143ad2-6d70-4053-a0ae-82311b7a9d6a',
  })
  @IsString()
  urlRequestId?: string;

  @ApiPropertyOptional({
    type: String,
    example: 'Sending Url Success Created',
  })
  @IsString()
  response?: string;

  @ApiPropertyOptional({ type: 'string', format: 'binary', required: false })
  file?: any;
}

export class SearchNewsDto {
  @ApiPropertyOptional({
    type: String,
    example: 'News Title',
    nullable: true,
  })
  title?: string;

  @ApiPropertyOptional({
    type: String,
    example: 'News Description',
    nullable: true,
  })
  description?: string;

  @ApiPropertyOptional({
    type: String,
    example: 'id',
    nullable: true,
  })
  newsCategory?: string;
}

export class UpdateUrlRequestDtoIn {
  @ApiPropertyOptional({
    type: String,
    example: '3c143ad2-6d70-4053-a0ae-82311b7a9d6a',
  })
  @IsString()
  urlRequestId?: string;

  @ApiPropertyOptional({
    type: String,
    example: 'News Title',
  })
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    type: String,
    example: 'News Description',
  })
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    type: String,
    example: 'Dzikri Faza',
  })
  @IsString()
  author?: string;

  @ApiPropertyOptional({
    type: String,
    example: 'Narasi',
  })
  @IsString()
  source?: string;

  @ApiPropertyOptional({
    type: Date,
    example: '2023-11-28 19:30:43.934129',
  })
  @IsDate()
  publishDate?: Date;

  @ApiPropertyOptional({
    type: String,
    example: 'Mengadakan, Berita, Alkaline',
  })
  @IsString()
  newsKeywords?: string;

  @ApiPropertyOptional({
    type: String,
    example: 'Incar, Masa De, Kta',
  })
  @IsString()
  ambigousKeywords?: string;

  @ApiPropertyOptional({
    type: Boolean,
    example: false,
  })
  @IsBoolean()
  isTraining?: boolean;

  @ApiPropertyOptional({
    type: Date,
    example: '2023-11-28 19:30:43.934129',
  })
  @IsDate()
  trainingDate?: Date;

  @ApiPropertyOptional({
    type: String,
    example: 'NOT TRAINED | HOAX | AKTUAL',
  })
  @IsString()
  label?: string;

  @ApiPropertyOptional({
    type: String,
    example: 'Bandung',
  })
  @IsString()
  location?: string;

  @ApiPropertyOptional({
    type: String,
    example: 'https://narasi.tv/read/narasi-daily/harga-gift-tiktok',
  })
  @IsString()
  url?: string;
}

export class ValidateNewsDtoIn {
  @ApiPropertyOptional({
    type: String,
    example: 'a0b0b5f9-7c4c-4d4c-8d8c-8d8c8d8c8d8c',
  })
  id: string;

  @ApiProperty({
    type: String,
    example: 'a0b0b5f9-7c4c-4d4c-8d8c-8d8c8d8c8d8c',
  })
  userId: string;
}

export class FindAllNewsDtoIn {
  @ApiPropertyOptional({
    type: String,
    example: 'isValidated',
  })
  isValidated: string;
}
