import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from './base.dto';

export class PaginationDtoIn {
  @ApiProperty({ default: 1 })
  page: number;

  @ApiProperty()
  size: number;
}

export class PaginationWithSearchDtoIn extends PaginationDtoIn {
  @ApiProperty()
  keyword: string;
}

export class BasePaginationDto<T> extends BaseDto<T> {
  @ApiProperty()
  currentPage: number;

  @ApiProperty()
  totalPages: number;

  constructor(
    message: string,
    data: T,
    paginationMetaData: {
      currentPage: number;
      totalPages: number;
    },
  ) {
    super(message, data);
    this.currentPage = paginationMetaData.currentPage;
    this.totalPages = paginationMetaData.totalPages;
  }
}
