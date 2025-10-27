import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { ExcelImportService } from './excel-import.service';
import * as path from 'path';


@Controller('file')
export class MulterController {
  constructor(private readonly excelService: ExcelImportService) { }

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          callback(null, `${Math.random()}-${file.originalname}`);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File, @Param('breanchesId') breanchesId: number) {
    // Fayl yo‘lini to‘liq qilib olish
    const fullPath = path.resolve(`./uploads/${file.filename}`);

    // Excel faylni import qilish
    const result = this.excelService.importFromExcel(fullPath, breanchesId);

    return {
      url: file.filename,
      ...result,
    };
  }
}
