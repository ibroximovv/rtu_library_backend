import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { BaseService } from 'src/infrastructure/lib/baseService';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class StudentService extends BaseService<PrismaService['students'], CreateStudentDto, UpdateStudentDto> {
  constructor(readonly prisma: PrismaService) {
    super(prisma, prisma.students)
  }
}
