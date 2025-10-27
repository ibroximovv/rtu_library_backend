import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { StaffService } from './staff.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { AuthBranchGuard } from 'src/guard/auth-branch/auth-branch.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PaginationQueryDto } from 'src/dto/pagination.dto';

@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) { }

  @ApiBearerAuth('access-token')
  @UseGuards(AuthBranchGuard)
  @Post()
  create(@Body() createStaffDto: CreateStaffDto) {
    return this.staffService.create(createStaffDto);
  }

  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    return this.staffService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.staffService.findOne({ id });
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateStaffDto: UpdateStaffDto) {
    return this.staffService.update({ id }, updateStaffDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.staffService.remove({ id });
  }
}
