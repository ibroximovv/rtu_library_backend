import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateToRentBookDto } from './dto/create-to-rent-book.dto';
import { UpdateToRentBookDto } from './dto/update-to-rent-book.dto';
import { BaseService } from 'src/infrastructure/lib/baseService';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Request } from 'express';
import { AcceptToRentBookDto } from './dto/accept-to-rent-book.dto';

@Injectable()
export class ToRentBookService extends BaseService<PrismaService['toRentBook'], CreateToRentBookDto, UpdateToRentBookDto> {
  constructor(readonly prisma: PrismaService) {
    super(prisma, prisma.toRentBook);
  }

  async create(createToRentBookDto: CreateToRentBookDto, req?: Request) {
    const branchId = req?.['branch']?.id;
    if (!branchId) {
      throw new BadRequestException('Branch ID not found in request');
    }

    const branch = await this.prisma.branches.findFirst({
      where: { id: branchId },
    });

    if (!branch) {
      throw new BadRequestException(`Branch with id: ${branchId} not found`);
    }

    const book = await this.prisma.book.findFirst({ where: { id: createToRentBookDto.bookId } })
    if (!book) throw new BadRequestException(`Book with id: ${createToRentBookDto.bookId} not found`)
    if (book.quantity < createToRentBookDto.quantity) throw new BadRequestException(`Book with id: ${createToRentBookDto.bookId} is not available`)

    if (createToRentBookDto.studentsId) {
      const student = await this.prisma.students.findFirst({ where: { id: createToRentBookDto.studentsId } })
      if (!student) throw new BadRequestException(`Student with id: ${createToRentBookDto.studentsId} not found`)
      await this.prisma.students.update({ where: { id: createToRentBookDto.studentsId }, data: { numberOfBooks: student.numberOfBooks ? student.numberOfBooks + createToRentBookDto.quantity : createToRentBookDto.quantity } })
    } else {
      const staff = await this.prisma.staff.findFirst({ where: { id: createToRentBookDto.staffId } })
      if (!staff) throw new BadRequestException(`Staff with id: ${createToRentBookDto.staffId} not found`)
    }


    const data = {
      ...createToRentBookDto,
      branchesId: branchId,
    }

    const transaction = await this.prisma.$transaction([
      this.prisma.toRentBook.create({ data }),
      this.prisma.book.update({ where: { id: createToRentBookDto.bookId }, data: { quantity: book.quantity - createToRentBookDto.quantity } }),
    ])

    return {
      statusCode: 201,
      message: 'To rent book created successfully',
      data: transaction,
    }
  }

  async acceptToRentBook(id: number, acceptToRentBookDto: AcceptToRentBookDto) {
    const toRentBook = await this.prisma.toRentBook.findFirst({ where: { id }, include: { book: true } })
    if (!toRentBook) throw new BadRequestException(`To rent book with id: ${id} not found`)

    const transaction = await this.prisma.$transaction([
      this.prisma.toRentBook.update({ where: { id }, data: acceptToRentBookDto }),
      this.prisma.book.update({ where: { id: toRentBook.bookId }, data: { quantity: toRentBook.quantity + 1, numberOfReadings: toRentBook.book.numberOfReadings ? toRentBook.book.numberOfReadings + 1 : 1 } }),
    ])

    return {
      statusCode: 200,
      message: 'To rent book accepted successfully',
      data: transaction,
    }
  }
}
