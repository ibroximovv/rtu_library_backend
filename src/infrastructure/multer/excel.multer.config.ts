import { BadRequestException } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { memoryStorage } from 'multer';

const XLSX_MIME = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
const MAX_SIZE_BYTES = 2 * 1024 * 1024; // 2MB

export const excelMulterOptions: MulterOptions = {
  storage: memoryStorage(),
  limits: {
    fileSize: MAX_SIZE_BYTES,
  },
  fileFilter: (_req, file, cb) => {
    const isXlsx = file.mimetype === XLSX_MIME || file.originalname.toLowerCase().endsWith('.xlsx');
    if (!isXlsx) {
      return cb(new BadRequestException('Only .xlsx files are allowed'), false);
    }
    cb(null, true);
  },
};
