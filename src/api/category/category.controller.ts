import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Request } from 'express';
import { AuthBranchGuard } from 'src/guard/auth-branch/auth-branch.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PaginationQueryDto } from 'src/dto/pagination.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @ApiBearerAuth('access-token')
  @UseGuards(AuthBranchGuard)
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto, @Req() req: Request) {
    return this.categoryService.create(createCategoryDto, req);
  }

  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    return this.categoryService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.categoryService.findOne({ id });
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update({ id }, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.categoryService.remove({ id });
  }
}
