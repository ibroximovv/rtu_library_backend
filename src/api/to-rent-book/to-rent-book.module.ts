import { Module } from '@nestjs/common';
import { ToRentBookService } from './to-rent-book.service';
import { ToRentBookController } from './to-rent-book.controller';

@Module({
  controllers: [ToRentBookController],
  providers: [ToRentBookService],
})
export class ToRentBookModule {}
