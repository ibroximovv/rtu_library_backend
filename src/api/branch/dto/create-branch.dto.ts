import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateBranchDto {
    @ApiProperty({ example: 'Branch Name' })
    @IsString()
    name: string;

    @ApiProperty({ example: 'Branch Address' })
    @IsString()
    address: string;

    @ApiProperty({ example: 'Branch Login' })
    @IsString()
    login: string;

    @ApiProperty({ example: 'Branch Password' })
    @IsString()
    password: string;
}
