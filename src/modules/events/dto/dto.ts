import { IsString } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateEventDtoIn {
    @ApiProperty({
        type: String,
        example: 'Sharing Session'
    })
    event_title: string;

    @ApiProperty({
        type: String,
        example: 'Sharing session bersama dengan mentor xskil'
    })
    @IsString()
    event_description: string;

    @ApiProperty({
        type: Date,
        example: '2023-11-28 19:30:43.934129'
    })
    event_date: Date;

    @ApiProperty({
        type: String,
        example: 'https://drive.google.com/abc-123-xyz'
    })
    @IsString()
    file_path: string;

    @ApiProperty({
        type: String,
        example: 'sharing-session-mentor-xskil'
    })
    @IsString()
    file_name: string;

    @ApiProperty({
        type: Boolean,
        example: true
    })
    is_online: boolean;

    @ApiProperty({
        type: String,
        example: 'https://meet.google.com/abc-123-xyz'
    })
    @IsString()
    link_meetings: string;
}
