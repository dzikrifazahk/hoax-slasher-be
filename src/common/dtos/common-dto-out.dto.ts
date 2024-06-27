import { ApiProperty } from "@nestjs/swagger";

export class CommonDtoOut {
    @ApiProperty({
        example: "2024-1518D00"
    })
    createdAt: Date;

    @ApiProperty({
        example: "2024-1518D00"
    })
    updatedAt: Date;
}