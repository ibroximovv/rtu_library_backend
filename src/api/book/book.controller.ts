import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Query } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Request } from 'express';
import { AuthBranchGuard } from 'src/guard/auth-branch/auth-branch.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PaginationQueryDto } from 'src/dto/pagination.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) { }

  @ApiBearerAuth('access-token')
  @UseGuards(AuthBranchGuard)
  @Post()
  create(@Body() createBookDto: CreateBookDto, @Req() req: Request) {
    return this.bookService.create(createBookDto, req);
  }

  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    return this.bookService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.bookService.findOne({ id });
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update({ id }, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.bookService.remove({ id });
  }
}
