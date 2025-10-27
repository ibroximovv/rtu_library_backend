import { ApiProperty } from "@nestjs/swagger";
import { toRentBookDeadlineEnum, toRentBookStatusEnum } from "@prisma/client";
import { IsEnum, IsInt, IsOptional } from "class-validator";

export class CreateToRentBookDto {
    @ApiProperty({ example: 1 })
    @IsInt()
    bookId: number;

    @ApiProperty({ example: 1, required: false })
    @IsOptional()
    @IsInt()
    studentsId: number;

    @ApiProperty({ example: 1, required: false })
    @IsOptional()
    @IsInt()
    staffId: number;

    @ApiProperty({ example: 1 })
    @IsInt()
    quantity: number;

    @ApiProperty({ enum: toRentBookDeadlineEnum, example: toRentBookDeadlineEnum.WEEK2 })
    @IsEnum(toRentBookDeadlineEnum)
    deadline: toRentBookDeadlineEnum;

    @ApiProperty({ enum: toRentBookStatusEnum, example: toRentBookStatusEnum.RENTED })
    @IsEnum(toRentBookStatusEnum)
    status: toRentBookStatusEnum;
}