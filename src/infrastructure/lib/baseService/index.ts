import { NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { PaginationQueryDto } from 'src/dto/pagination.dto';

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

    async findAll(
        query: PaginationQueryDto,
        options?: {
            where?: Record<string, any>;
            include?: Record<string, any>;
            select?: Record<string, any>;
            defaultSearchFields?: string[];
            orderBy?: any;
        },
    ) {
        const {
            page: rawPage = 1 as any,
            limit: rawLimit = 10 as any,
            search,
            searchFields,
            sortBy = 'createdAt',
            sortOrder = 'desc',
        } = query;

        const page = Number(rawPage) || 1;
        const limit = Number(rawLimit) || 10;
        const skip = (page - 1) * limit;

        const where: any = { ...(options?.where || {}) };

        if (search) {
            const fields = searchFields
                ? searchFields.split(',').map((f) => f.trim()).filter(Boolean)
                : options?.defaultSearchFields || [];

            if (fields.length > 0) {
                where.OR = fields.map((field: string) => ({
                    [field]: { contains: search, mode: 'insensitive' },
                }));
            }
        }

        const orderBy = options?.orderBy || { [sortBy]: sortOrder };

        const [data, total] = await (this.prisma as any).$transaction([
            (this.model as any).findMany({
                where,
                skip,
                take: limit,
                orderBy,
                include: options?.include,
                select: options?.select,
            }),
            (this.model as any).count({ where }),
        ]);

        return {
            statusCode: 200,
            message: 'success',
            total,
            page,
            limit,
            data,
        };
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
