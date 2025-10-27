import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { BaseService } from 'src/infrastructure/lib/baseService';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class StaffService extends BaseService<PrismaService['staff'], CreateStaffDto, UpdateStaffDto> {
  constructor(readonly prisma: PrismaService) {
    super(prisma, prisma.staff);
  }

  async create(createStaffDto: CreateStaffDto, req?: Request) {
    const branchId = req?.['branch']?.id;
    if (!branchId) throw new BadRequestException('Branch ID not found in request');

    const branch = await this.prisma.branches.findFirst({
      where: { id: branchId },
    });

    if (!branch) throw new BadRequestException(`Branch with id: ${branchId} not found`);

    const data = {
      ...createStaffDto,
      branchId,
    }

    return super.create(data);
  }
}
