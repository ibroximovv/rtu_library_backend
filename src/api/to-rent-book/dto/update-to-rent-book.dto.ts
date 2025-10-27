import { PartialType } from '@nestjs/swagger';
import { CreateToRentBookDto } from './create-to-rent-book.dto';

export class UpdateToRentBookDto extends PartialType(CreateToRentBookDto) {}
