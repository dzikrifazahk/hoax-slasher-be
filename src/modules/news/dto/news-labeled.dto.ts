import { ApiOAuth2, ApiProperty } from '@nestjs/swagger';
import { NewsLabel } from 'src/common/enum/enum';

export class CreateNewsLabeledDtoIn {
  @ApiProperty({
    type: String,
    example: 'HOAX',
  })
  label: NewsLabel;

  @ApiProperty({
    type: Date,
    example: '2023-11-30 05:03:05.2928	',
  })
  training_date: Date;

  @ApiProperty({
    type: String,
    example: 'Model Name',
  })
  model_name: string;

  @ApiProperty({
    type: Number,
    example: 100,
  })
  accuracy: number;

  @ApiProperty({
    type: String,
    example: '3c143ad2-6d70-4053-a0ae-82311b7a9d6a',
  })
  news_not_labeled_id: string;
}
