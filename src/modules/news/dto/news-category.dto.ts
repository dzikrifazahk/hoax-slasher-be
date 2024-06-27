import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { CommonDtoOut } from 'src/common/dtos/common-dto-out.dto';

export class CreateNewsCategoryDtoIn {
  @ApiPropertyOptional({
    description: 'Category ID (optional)',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsUUID()
  id?: string;

  @ApiProperty({
    example: 'Politics',
  })
  name: string;

  @ApiProperty({
    example: 'This category about politics',
  })
  description: string;

  @ApiPropertyOptional({
    description: 'Alias Code (optional)',
    example: '1',
  })
  @IsOptional()
  @IsNumber()
  aliasCode?: number;
}

export class ResponseNewsCategoryDtoOut extends CommonDtoOut {
  @ApiPropertyOptional({
    description: 'Category ID (optional)',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsUUID()
  id?: string;

  @ApiProperty({
    example: 'Politics',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'This category about politics',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: 'This category about politics',
  })
  @IsString()
  aliasCode: string;
}
