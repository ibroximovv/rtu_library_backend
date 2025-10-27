import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BaseService } from 'src/infrastructure/lib/baseService';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class BookService extends BaseService<PrismaService['book'], CreateBookDto, UpdateBookDto> {
  constructor(readonly prisma: PrismaService) {
    super(prisma, prisma.book)
  }
  async create(createBookDto: CreateBookDto, req?: Request) {
    const branchId = req?.['branch']?.id
    const branch = await this.prisma.branches.findUnique({ where: { id: branchId } })
    if (!branch) {
      throw new BadRequestException('Branch not found')
    }

    const data = {
      ...createBookDto,
      branchesId: branchId
    }

    return super.create(data);
  }
}
