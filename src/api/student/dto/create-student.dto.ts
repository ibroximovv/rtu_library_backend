import { ApiProperty } from "@nestjs/swagger";
import { courseNumberEnum, formOfEducationEnum } from "@prisma/client";
import { IsEnum, IsOptional, IsString } from "class-validator";

export class CreateStudentDto {
    @ApiProperty({ example: 'Student Full Name' })
    @IsString()
    fullName: string

    @ApiProperty({ example: 'Student Password' })
    @IsString()
    password: string

    @ApiProperty({ example: 'Student Phone Number' })
    @IsString()
    phoneNumber: string

    @ApiProperty({ enum: courseNumberEnum, example: courseNumberEnum.COURSE1, required: false })
    @IsOptional()
    @IsEnum(courseNumberEnum)
    courseNumber?: courseNumberEnum

    @ApiProperty({ example: '19k-23', required: false })
    @IsOptional()
    @IsString()
    groupNumber?: string

    @ApiProperty({ enum: formOfEducationEnum, example: formOfEducationEnum.DAYTIME, required: false })
    @IsOptional()
    @IsEnum(formOfEducationEnum)
    formOfEducation?: formOfEducationEnum

    @ApiProperty({ example: 'Student Telegram User Name', required: false })
    @IsOptional()
    @IsString()
    telegramUserName?: string

    @ApiProperty({ example: 'Student Telegram User ID', required: false })
    @IsOptional()
    @IsString()
    telegramUserId?: string

    @ApiProperty({ example: 'Student Email', required: false })
    @IsOptional()
    @IsString()
    email?: string

    @ApiProperty({ example: 'Student QR Code', required: false })
    @IsOptional()
    @IsString()
    qrCode?: string
}
