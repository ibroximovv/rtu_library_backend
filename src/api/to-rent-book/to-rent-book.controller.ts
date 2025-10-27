import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ToRentBookService } from './to-rent-book.service';
import { CreateToRentBookDto } from './dto/create-to-rent-book.dto';
import { UpdateToRentBookDto } from './dto/update-to-rent-book.dto';
import { AcceptToRentBookDto } from './dto/accept-to-rent-book.dto';
import { AuthBranchGuard } from 'src/guard/auth-branch/auth-branch.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('to-rent-book')
export class ToRentBookController {
  constructor(private readonly toRentBookService: ToRentBookService) { }

  @ApiBearerAuth('access-token')
  @UseGuards(AuthBranchGuard)
  @Post()
  create(@Body() createToRentBookDto: CreateToRentBookDto) {
    return this.toRentBookService.create(createToRentBookDto);
  }

  @Get()
  findAll() {
    return this.toRentBookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.toRentBookService.findOne({ id });
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateToRentBookDto: UpdateToRentBookDto) {
    return this.toRentBookService.update({ id }, updateToRentBookDto);
  }

  @Patch(':id/accept')
  acceptToRentBook(@Param('id') id: number, @Body() acceptToRentBookDto: AcceptToRentBookDto) {
    return this.toRentBookService.acceptToRentBook(id, acceptToRentBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.toRentBookService.remove({ id });
  }
}
