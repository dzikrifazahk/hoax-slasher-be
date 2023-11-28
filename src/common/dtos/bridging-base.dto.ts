import { ApiProperty } from '@nestjs/swagger';

export class MetaData {
  @ApiProperty()
  message: string;

  @ApiProperty()
  code: number;
}