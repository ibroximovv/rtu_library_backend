import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { BranchModule } from './branch/branch.module';
import { CategoryModule } from './category/category.module';
import { BookModule } from './book/book.module';
import { StudentModule } from './student/student.module';
import { StaffModule } from './staff/staff.module';
import { ToRentBookModule } from './to-rent-book/to-rent-book.module';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'src/config';
import { ExcelImportModule } from './excel-import/excel-import.module';

@Module({
  imports: [PrismaModule, BranchModule, CategoryModule, BookModule, StudentModule, StaffModule, ToRentBookModule, ExcelImportModule,
    JwtModule.register({
        global: true,
        secret: config.JWT_SECRET || 'jwt_secret',
        signOptions: { expiresIn: '12h' },
      })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
