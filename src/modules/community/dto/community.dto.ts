import { ApiProperty, ApiRequestTimeoutResponse } from "@nestjs/swagger";
import { CommunityStatus } from "src/common/enum/enum";

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
        type: String, 
        required: true, 
        example: 'Community Address'
    })
    community_address: string;

    @ApiProperty({
        type: String, 
        required: true,
        example: '3c143ad2-6d70-4053-a0ae-82311b7a9d6a'
    })
    community_category_id: string;
}

export class UpdateCommunityDto {
    @ApiProperty({
        type: String, 
        example: 'Community Name'
    })
    community_name: string;

    @ApiProperty({
        type: String,  
        example: 'Community Description'
    })
    community_description: string;
    
    @ApiProperty({
        type: String,  
        example: 'Community Address'
    })
    community_address: string;

    @ApiProperty({
        type: String, 
        example: 'INACTIVE'
    })
    community_status: CommunityStatus;

    @ApiProperty({
        type: String, 
        example: '3c143ad2-6d70-4053-a0ae-82311b7a9d6a'
    })
    community_category_id: string;
}
