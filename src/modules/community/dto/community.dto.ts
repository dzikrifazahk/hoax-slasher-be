import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { CommunityStatus } from 'src/common/enum/enum';

export class CreateOrUpdateCommunityDtoIn {
  @ApiPropertyOptional({
    example: '3c143ad2-6d70-4053-a0ae-82311b7a9d6a',
  })
  @IsOptional()
  @IsUUID()
  id?: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'Hoax Chaser',
  })
  name: string;

  @ApiPropertyOptional({
    type: String,
    required: false,
    example: 'Community Description',
  })
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    type: String,
    required: false,
    example: 'Community Address',
  })
  @IsString()
  address?: string;

  @ApiPropertyOptional({
    required: false,
    example: '3c143ad2-6d70-4053-a0ae-82311b7a9d6a (masukkan user_id)',
  })
  @IsUUID()
  leader?: string;

  @ApiPropertyOptional({ type: 'string', format: 'binary', required: false })
  file?: any;
}

export class UpdateCommunityDto {
  @ApiProperty({
    type: String,
    example: 'Community Name',
  })
  community_name: string;

  @ApiProperty({
    type: String,
    example: 'Community Description',
  })
  community_description: string;

  @ApiProperty({
    type: String,
    example: 'Community Address',
  })
  community_address: string;

  @ApiProperty({
    type: String,
    example: 'INACTIVE',
  })
  community_status: CommunityStatus;

  @ApiProperty({
    type: String,
    example: '3c143ad2-6d70-4053-a0ae-82311b7a9d6a',
  })
  community_category_id: string;
}
