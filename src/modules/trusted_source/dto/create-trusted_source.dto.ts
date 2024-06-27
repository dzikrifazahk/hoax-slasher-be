import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CreateTrustedSourceDtoIn {
  @ApiPropertyOptional({
    example: '3c143ad2-6d70-4053-a0ae-82311b7a9d6a',
  })
  @IsUUID()
  id?: string;

  @ApiProperty({
    type: String,
    example: 'Company Name',
    required: true,
    minLength: 2
  })
  companyName: string;

  @ApiPropertyOptional({
    type: String,
    required: false,
    example: 'Company Description',
  })
  companyDescription?: string;

  @ApiPropertyOptional({
    type: String,
    example: 'mail@company.com',
  })
  companyEmail?: string;
}
