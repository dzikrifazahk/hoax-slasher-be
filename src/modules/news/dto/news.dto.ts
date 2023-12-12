import { ApiOAuth2, ApiProperty } from '@nestjs/swagger';

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
    nullable: true
  })
  file_name?: Date;

  @ApiProperty({
    type: String,
    example: 'user/src/sss',
    nullable: true
  })
  file_path?: string;
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
