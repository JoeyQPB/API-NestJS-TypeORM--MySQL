import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user-dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user-dto';
import { UpdatePutUserDTO } from './dto/update-put-user-dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  // como esta no msm modulo n eh necessario exportar desse modulo

  @Post('create')
  async create(@Body() data: CreateUserDTO) {
    return this.userService.create(data);
    // ñ precisa colocar await para retornos assincornos
  }

  @Get()
  async readAlllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  async readOneUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getOneUser(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdatePutUserDTO,
  ) {
    return this.userService.update(id, data);
  }

  @Patch(':id')
  async updatePartial(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdatePatchUserDTO,
  ) {
    return this.userService.updatePartial(id, data);
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}
