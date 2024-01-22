import { ApiOAuth2, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { NewsEmotionStatus, NewsLabel } from 'src/common/enum/enum';
import { IsBoolean, IsDate, IsNotEmpty, IsString, IsUUID } from '@nestjs/class-validator';

export class CreateNewsDtoIn {
  @ApiProperty({
    type: String,
    example: 'News Title',
  })
  news_title: string;

  @ApiProperty({
    type: String,
    example: 'News Description',
  })
  news_description: string;

  @ApiProperty({
    type: String,
    example: 'News Author',
  })
  news_author: string;

  @ApiProperty({
    type: String,
    example: 'News Source',
  })
  news_source: string;

  @ApiProperty({
    type: Date,
    example: '2023-11-28 19:30:43.934129',
  })
  news_publish_date: Date;

  @ApiProperty({
    type: String,
    example: '3c143ad2-6d70-4053-a0ae-82311b7a9d6a',
  })
  news_category_id: string;

  @ApiProperty({
    type: String,
    example: 'file.jpg',
    nullable: true,
  })
  file_name?: string;

  @ApiProperty({
    type: String,
    example: 'user/src/sss',
    nullable: true,
  })
  file_path?: string;

  @ApiProperty({
    type: String,
    example: 'News Label',
    nullable: true,
  })
  label: NewsLabel;
}

export class UpdateNewsDtoIn {
  @ApiProperty({
    type: String,
    example: 'News Title',
  })
  news_title: string;

  @ApiProperty({
    type: String,
    example: 'News Description',
  })
  news_description: string;

  @ApiProperty({
    type: String,
    example: 'News Author',
  })
  news_author: string;

  @ApiProperty({
    type: String,
    example: 'News Source',
  })
  news_source: string;

  @ApiProperty({
    type: Date,
    example: '2023-11-28 19:30:43.934129',
  })
  news_publish_date: Date;
}

export class SearchNewsDto {
  @ApiPropertyOptional({
    type: String,
    example: 'News Title',
    nullable: true,
  })
  news_title?: string;

  @ApiPropertyOptional({
    type: String,
    example: 'News Description',
    nullable: true,
  })
  news_description?: string;

  @ApiPropertyOptional({
    type: String,
    example: 'id',
    nullable: true,
  })
  newsCategory?: string;
}

export class UpdatedPredictDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  label: NewsLabel;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  is_ambiguous: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  is_training: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  training_date: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  news_emotion: NewsEmotionStatus;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  percentage: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  ambiguous_percentage: string;
}
