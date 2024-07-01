import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateOrUpdateDebunkingDtoIn {
  @ApiPropertyOptional({
    type: String,
    example: 'abbb64a1-ac91-4c8f-b48b-87d41c426041',
  })
  id?: string;

  @ApiProperty({
    type: String,
    example:
      'Berita ini merupakan sebuah faktual berikut saya akan sertakan dengan bukti lainya',
  })
  reason: string;

  @ApiPropertyOptional({
    type: String,
    example:
      'https://news.detik.com/pemilu/d-7055115/anies-baswedan-akan-mulai-kampanye-dari-dki-jakarta',
  })
  evidenceLinks: string;

  @ApiProperty({
    type: String,
    example: 'abbb64a1-ac91-4c8f-b48b-87d41c426041',
  })
  newsId: string;

  @ApiProperty({
    type: String,
    example: 'abbb64a1-ac91-4c8f-b48b-87d41c426041',
  })
  userId: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  file?: any;
}

export class ResponseDebunkingDtoOut {
  @ApiProperty({
    type: String,
    example: 'abbb64a1-ac91-4c8f-b48b-87d41c426041',
  })
  id?: string;

  @ApiProperty({
    type: String,
    example:
      'Berita ini merupakan sebuah faktual berikut saya akan sertakan dengan bukti lainya',
  })
  reason: string;

  @ApiProperty({
    type: String,
    example:
      'https://news.detik.com/pemilu/d-7055115/anies-baswedan-akan-mulai-kampanye-dari-dki-jakarta',
  })
  evidenceLinks: string;

  @ApiProperty({
    type: String,
    example: 'abbb64a1-ac91-4c8f-b48b-87d41c426041',
  })
  newsId: string;

  @ApiProperty({
    type: String,
    example: 'abbb64a1-ac91-4c8f-b48b-87d41c426041',
  })
  userId: string;

  @ApiProperty({
    type: String,
    example: 'filename.jpg',
  })
  file_name: string;

  @ApiProperty({
    type: String,
    example: 'usr/local/filename.jpg',
  })
  file_path: string;
}

export class FindByIdDebunkingDtoIn {
  @ApiPropertyOptional({
    type: String,
    example: 'abbb64a1-ac91-4c8f-b48b-87d41c426041',
  })
  @IsOptional()
  idDebunking?: string;
  
  @ApiPropertyOptional({
    type: String,
    example: 'abbb64a1-ac91-4c8f-b48b-87d41c426041',
  })
  @IsOptional()
  idUser?: string;
}
