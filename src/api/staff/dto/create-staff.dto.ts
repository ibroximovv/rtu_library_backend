import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateStaffDto {
    @ApiProperty({ example: 'Staff Full Name' })
    @IsString()
    fullName: string

    @ApiProperty({ example: 'Staff Password' })
    @IsString()
    password: string

    @ApiProperty({ example: 'Staff Phone Number' })
    @IsString()
    phoneNumber: string

    @ApiProperty({ example: 'Staff Telegram User Name', required: false })
    @IsOptional()
    @IsString()
    telegramUserName?: string

    @ApiProperty({ example: 'Staff Telegram User ID', required: false })
    @IsOptional()
    @IsString()
    telegramUserId?: string

    @ApiProperty({ example: 'Staff Email', required: false })
    @IsOptional()
    @IsString()
    email?: string

    @ApiProperty({ example: 'Staff QR Code', required: false })
    @IsOptional()
    @IsString()
    qrCode?: string
}
