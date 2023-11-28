import { ApiProperty } from "@nestjs/swagger";

export class CreateCommunityDtoIn {
    @ApiProperty({
        type: String, 
        required: true, 
        example: 'Community Name'
    })
    community_name: string;

    @ApiProperty({
        type: String, 
        required: true, 
        example: 'Community Description'
    })
    community_description: string;

    @ApiProperty({
        type: Number, 
        required: true, 
        example: 1
    })
    community_status: number;

    @ApiProperty({
        type: String, 
        required: true, 
        example: 'Community Address'
    })
    community_address: string;

}
