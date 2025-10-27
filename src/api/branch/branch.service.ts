import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { BaseService } from 'src/infrastructure/lib/baseService';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { LoginBranchDto } from './dto/login-branch.dto';
import { JwtService } from '@nestjs/jwt';
import { BcryptEncryption } from 'src/infrastructure/lib/bcrypt';

@Injectable()
export class BranchService extends BaseService<PrismaService['branches'], CreateBranchDto, UpdateBranchDto> {
  constructor(readonly prisma: PrismaService, private readonly jwt: JwtService) {
    super(prisma, prisma.branches);
  }

  async create(createBranchDto: CreateBranchDto) {
    const branch = await this.prisma.branches.findFirst({ where: { login: createBranchDto.login } })
    if (branch) throw new BadRequestException('Branch already exists')

    const hashedPassword = BcryptEncryption.encrypt(createBranchDto.password)
    const data = {
      ...createBranchDto,
      password: hashedPassword,
    }

    return super.create(data)
  }

  async login(loginBranchDto: LoginBranchDto) {
    const branch = await this.prisma.branches.findFirst({
      where: { login: loginBranchDto.login }
    })
    if (!branch) throw new BadRequestException('Branch not found!')
    const isPasswordValid = BcryptEncryption.compare(loginBranchDto.password, branch.password)
    if (!isPasswordValid) throw new BadRequestException('Invalid password!')

    const token = this.jwt.sign({ id: branch.id })
    return { token }
  }

}
