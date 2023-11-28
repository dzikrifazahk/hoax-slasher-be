import { ApiProperty } from '@nestjs/swagger';
import { CreateCommunityDto } from './community.dto';

export class CreateCommunityCategoryDtoIn {
  @ApiProperty({
    type: String,
    example: 'Community Category Name',
    nullable: true
  })
  community_category_name: string;

  @ApiProperty({
    type: String,
    example: 'Community Category Description',
    nullable: true
  })
  community_category_description: string;

  @ApiProperty({
    type: Number,
    example: 1,
    nullable: true
  })
  alias_code: number;
}

export class UpdateCommunityDto {}
