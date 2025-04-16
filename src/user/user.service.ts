import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserQueryDto } from './dto/query-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(userDto: CreateUserDto) {
    const result = await this.prisma.user.create({
      data: userDto,
    });
    return { id: result.id };
  }

  async find(id: number | undefined, query?: UserQueryDto) {
    if (!id) {
      id = undefined;
    }
    const result = await this.prisma.user.findMany({
      where: {
        id,
        full_name: query.full_name,
        efficiency: query.efficiency,
        role: query.role,
      },
    });
    if (result.length === 0) {
      return false;
    }
    return result;
  }

  async update(id: number, userDto: Partial<CreateUserDto>) {
    try {
      return await this.prisma.user.update({
        where: { id },
        data: userDto,
      });
    } catch (err) {
      return false;
    }
  }

  async remove(id: number | undefined) {
    if (id) {
      try {
        return await this.prisma.user.delete({
          where: { id },
        });
      } catch (err) {
        return false;
      }
    } else {
      await this.prisma.user.deleteMany();
      return null;
    }
  }
}
