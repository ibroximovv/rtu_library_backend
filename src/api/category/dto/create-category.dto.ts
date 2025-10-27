import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty({example: 'Category Name'})
    @IsString()
    name: string;

    @ApiProperty({example: 'Qr Code', required: false })
    @IsOptional()
    @IsString()
    qrCode?: string;
}
