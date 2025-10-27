import { Module } from '@nestjs/common';
import { MulterController } from './excel-import.controller';
import { ExcelImportService } from './excel-import.service';

@Module({
  imports: [],
  controllers: [MulterController],
  providers: [ExcelImportService],
})
export class ExcelImportModule {}
