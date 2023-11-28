import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { UserRole } from "src/common/enum/enum";

export class UpdateDtoOutput {
    @ApiProperty()
    name?: string;

    @ApiProperty()
    email?: string;

    @ApiProperty()
    role?: UserRole;

    @ApiProperty()
    needChangePassword?: boolean;

    @ApiPropertyOptional()
    file?: string;
}