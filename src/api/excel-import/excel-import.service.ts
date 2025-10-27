import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import * as XLSX from 'xlsx';
import * as fs from 'fs';
import { ExcelUploadSummary } from './dto/excel-upload-summary.dto';

@Injectable()
export class ExcelImportService {
  private readonly logger = new Logger(ExcelImportService.name);

  constructor(private readonly prisma: PrismaService) { }

  async importFromExcel(filePath: string, brnachesId: number) {
    if (!fs.existsSync(filePath)) {
      throw new BadRequestException('File not found');
    }

    const branch = await this.prisma.branches.findFirst({ where: { id: brnachesId } })
    if (!branch) throw new BadRequestException('Branch not found');

    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const rows: Record<string, any>[] = XLSX.utils.sheet_to_json(sheet, { defval: null });

    let createdCategories = 0;
    let createdBooks = 0;
    let updatedBooks = 0;
    let skippedRows = 0;
    const errors: { row: number; message: string }[] = [];

    const categoryCache = new Map<string, { id: number }>();

    for (let i = 0; i < rows.length; i++) {
      const rowIndex = i + 2;
      const row = rows[i];

      const categoryName = String(row['category'] ?? '').trim();
      const bookName = String(row['book'] ?? '').trim();
      const quantity = Number(row['quantity']);

      if (!categoryName || !bookName || !Number.isFinite(quantity) || quantity <= 0) {
        skippedRows++;
        errors.push({ row: rowIndex, message: 'Invalid data (category, book, quantity required)' });
        continue;
      }

      const categoryKey = `${categoryName.toLowerCase()}::${brnachesId}`;

      try {
        await this.prisma.$transaction(async (tx) => {
          let category = categoryCache.get(categoryKey);
          if (!category) {
            const existing = await tx.category.findFirst({
              where: { name: categoryName.toLowerCase(), branchesId: branch.id },
              select: { id: true },
            });
            if (existing) {
              category = existing;
            } else {
              category = await tx.category.create({
                data: {
                  name: categoryName.toLowerCase(),
                  branch: {
                    connect: { id: branch.id },
                  },
                },
                select: { id: true },
              });
              createdCategories++;
            }
            categoryCache.set(categoryKey, category);
          }

          const existingBook = await tx.book.findFirst({
            where: { name: bookName, branchesId: branch.id },
            select: { id: true, quantity: true },
          });

          if (existingBook) {
            await tx.book.update({
              where: { id: existingBook.id },
              data: { quantity: existingBook.quantity + quantity },
            });
            updatedBooks++;
          } else {
            await tx.book.create({
              data: {
                name: bookName.toLowerCase(),
                quantity,
                category: {
                  connect: { id: category.id },
                },
                branch: {
                  connect: { id: branch.id },
                }
              },
            });
            createdBooks++;
          }
        });
      } catch (e) {
        skippedRows++;
        const message = e?.message || 'Unexpected error';
        errors.push({ row: rowIndex, message });
        this.logger.warn(`Row ${rowIndex} failed: ${message}`);
      }
    }

    try {
      fs.unlinkSync(filePath); // yoki async qilish mumkin
    } catch (err) {
      this.logger.warn(`Failed to delete file: ${filePath}. Reason: ${err.message}`);
    }

    const summary: ExcelUploadSummary = {
      processedRows: rows.length,
      createdCategories,
      createdBooks,
      updatedBooks,
      skippedRows,
      errors,
    };

    return {
      statusCode: 201,
      message: 'Excel processed successfully',
      data: summary,
    };
  }
}
