import { Module } from '@nestjs/common';
import { BranchService } from './branch.service';
import { BranchController } from './branch.controller';

@Module({
  imports: [],
  controllers: [BranchController],
  providers: [BranchService],
})
export class BranchModule {}
