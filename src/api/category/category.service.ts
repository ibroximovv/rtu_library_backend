import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { BaseService } from 'src/infrastructure/lib/baseService';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class CategoryService extends BaseService<
  PrismaService['category'],
  CreateCategoryDto,
  UpdateCategoryDto
> {
  constructor(readonly prisma: PrismaService) {
    super(prisma, prisma.category);
  }

  async create(createCategoryDto: CreateCategoryDto, req?: Request) {
    const branchId = req?.['branch']?.id;
    if (!branchId) throw new BadRequestException('Branch ID not found in request');

    const branch = await this.prisma.branches.findFirst({
      where: { id: branchId },
    });

    if (!branch) throw new BadRequestException(`Branch with id: ${branchId} not found`);

    const data = {
      ...createCategoryDto,
      branchesId: branchId
    }

    return super.create(data);
  }
}
