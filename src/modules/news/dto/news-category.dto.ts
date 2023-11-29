import { ApiProperty } from "@nestjs/swagger";

export class CreateNewsCategoryDtoIn {
    @ApiProperty({
        description: 'Category Name',
        example: 'News Category Name',
    })
    news_category_name: string;

    @ApiProperty({
        description: 'Category Description',
        example: 'News Category Description',
    })
    news_category_description: string;

    @ApiProperty({
        description: 'Alias Code',
        example: 1,
    })
    alias_code: number;

}
