import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PaginationQueryDto } from 'src/dto/pagination.dto';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) { }

  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    return this.studentService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.studentService.findOne({ id });
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update({ id }, updateStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.studentService.remove({ id });
  }
}
