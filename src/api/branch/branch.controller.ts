import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BranchService } from './branch.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { LoginBranchDto } from './dto/login-branch.dto';
import { PaginationQueryDto } from 'src/dto/pagination.dto';

@Controller('branch')
export class BranchController {
  constructor(private readonly branchService: BranchService) {}

  @Post('login')
  login(@Body() loginBranchDto: LoginBranchDto) {
    return this.branchService.login(loginBranchDto);
  }

  @Post()
  create(@Body() createBranchDto: CreateBranchDto) {
    return this.branchService.create(createBranchDto);
  }

  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    return this.branchService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.branchService.findOne({ id });
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateBranchDto: UpdateBranchDto) {
    return this.branchService.update({ id }, updateBranchDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.branchService.remove({ id });
  }
}
