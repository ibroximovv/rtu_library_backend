import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString } from "class-validator";

export class CreateBookDto {
    @ApiProperty({ example: 'Book Name' })
    @IsString()
    name: string

    @ApiProperty({ example: 'Book Author', required: false })
    @IsOptional()
    @IsString()
    author?: string

    @ApiProperty({ example: 20 })
    @IsInt()
    quantity: number

    @ApiProperty({ example: 'Book QR Code', required: false })
    @IsOptional()
    @IsString()
    qrCode?: string

    @ApiProperty({ example: 1 })
    @IsInt()
    categoryId: number
}
