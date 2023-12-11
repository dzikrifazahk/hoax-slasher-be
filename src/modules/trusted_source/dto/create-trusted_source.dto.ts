import { ApiProperty } from "@nestjs/swagger";

export class CreateTrustedSourceDtoIn {
    @ApiProperty({
        type: String,
        example: 'Company Name',
    })
    company_name: string;

    @ApiProperty({
        type: String,
        example: 'Company Description',
    })
    company_description: string;

    @ApiProperty({
        type: String,
        example: 'mail@company.com',
    })
    company_email: string;

}
