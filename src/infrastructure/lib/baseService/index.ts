import { BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';

export class BaseService<ModelDelegate, CreateDto = any, UpdateDto = any> {
    constructor(
        protected readonly prisma: PrismaService,
        protected readonly model: ModelDelegate,
    ) { }

    async create(data: CreateDto) {
        try {
            const created = await (this.model as any).create({ data });
            return { statusCode: 201, message: 'success', data: created };
        } catch (error) {
            throw error; 
        }
    }

    async findAll(params?: any) {
        const data = await (this.model as any).findMany(params);
        return { statusCode: 200, message: 'success', data };
    }

    async findOne(where: any) {
        const data = await (this.model as any).findFirst({ where });
        if (!data)
            throw new NotFoundException(
                `${this.constructor.name.replace('Service', '')} not found`,
            );
        return { statusCode: 200, message: 'success', data };
    }

    async update(where: any, data: UpdateDto) {
        const findone = await (this.model as any).findFirst({ where });
        if (!findone)
            throw new NotFoundException(
                `${this.constructor.name.replace('Service', '')} not found`,
            );

        const updated = await (this.model as any).update({
            where,
            data,
        });
        return { statusCode: 200, message: 'success', data: updated };
    }

    async remove(where: any) {
        const findone = await (this.model as any).findFirst({ where });
        if (!findone)
            throw new NotFoundException(
                `${this.constructor.name.replace('Service', '')} not found`,
            );

        const deleted = await (this.model as any).delete({ where });
        return { statusCode: 200, message: 'deleted', data: deleted };
    }
}
