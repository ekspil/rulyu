import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Patch,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserQueryDto } from './dto/query-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('/get/:id?')
  async find(@Param('id') id: string, @Query() query: UserQueryDto) {
    const result = await this.userService.find(+id, query);
    if (result === false) {
      throw new HttpException(
        'Запись с указанными параметрами не найдена',
        HttpStatus.NOT_FOUND,
      );
    }
    return result;
  }

  @Patch('/update/:id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const result = await this.userService.update(+id, updateUserDto);
    if (result === false) {
      throw new HttpException(
        'Запись с указанным id не найдена',
        HttpStatus.NOT_FOUND,
      );
    }
    return result;
  }

  @Delete('/delete/:id?')
  async remove(@Param('id') id: string) {
    const result = await this.userService.remove(+id);
    if (result === false) {
      throw new HttpException('Запись не найдена', HttpStatus.NOT_FOUND);
    }
    return result;
  }
}
