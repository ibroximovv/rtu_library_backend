import { ApiProperty } from "@nestjs/swagger";
import { toRentBookStatusEnum } from "@prisma/client";
import { IsEnum, IsInt } from "class-validator";

export class AcceptToRentBookDto {
    @ApiProperty({ enum: toRentBookStatusEnum, example: toRentBookStatusEnum.RETURNED })
    @IsEnum(toRentBookStatusEnum)
    status: toRentBookStatusEnum;
}
