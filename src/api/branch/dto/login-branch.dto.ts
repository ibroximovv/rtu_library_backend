import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LoginBranchDto {
    @ApiProperty({ example: 'login' })
    @IsString()
    login: string;

    @ApiProperty({ example: 'password' })
    @IsString()
    password: string;
}