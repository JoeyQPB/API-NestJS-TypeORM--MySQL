import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user-dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user-dto';
import { UpdatePutUserDTO } from './dto/update-put-user-dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor() {}

  async create(data: CreateUserDTO) {
    if (data.birthAt) {
      data.birthAt = new Date(data.birthAt);
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(data.password, salt);

    data.password = hashedPassword;

    return await this.prisma.user.create({
      data,
    });
  }

  async getAllUsers() {
    return this.prisma.user.findMany();
  }

  // PEGAR TODOS ONDE TEM GMAIL
  //   async getAllUsers() {
  //   return this.prisma.user.findMany({
  //     where: {
  //       email: {
  //         contains: "@gmail.com"
  //       }
  //     }
  //   });
  // }

  // async getOneUser(id: number) {
  //   return this.prisma.user.findFirst({
  //     where: {
  //       id,
  //     },
  //   });
  // }

  // onde tem o id passado (+1)
  // retorna 1 arr
  // async getOneUser(id: number) {
  //   return this.prisma.user.findMany({
  //     where: { id },
  //   });
  // }

  // mais rapido
  async getOneUser(id: number) {
    await this.exists(id);

    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async update(
    id: number,
    { name, email, password, birthAt, role }: UpdatePutUserDTO,
  ) {
    await this.exists(id);

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    password = hashedPassword;

    return this.prisma.user.update({
      data: {
        name,
        email,
        password,
        birthAt: birthAt ? new Date(birthAt) : null,
        role,
      },
      where: {
        id,
      },
    });
  }

  async updatePartial(
    id: number,
    { name, email, password, birthAt, role }: UpdatePatchUserDTO,
  ) {
    await this.exists(id);

    const data: UpdatePatchUserDTO = {};

    if (birthAt) {
      data.birthAt = new Date(birthAt);
    }

    if (email) {
      data.email = email;
    }

    if (role) {
      data.role = role;
    }

    if (name) {
      data.name = name;
    }

    if (password) {
      const salt = await bcrypt.genSalt();
      const hasehdPassword = await bcrypt.hash(password, salt);
      data.password = hasehdPassword;
    }

    return this.prisma.user.update({
      data,
      where: {
        id: id,
      },
    });
  }

  async delete(id: number) {
    await this.exists(id);

    return this.prisma.user.delete({
      where: { id },
    });
  }

  async exists(id: number) {
    if (
      !(await this.prisma.user.count({
        where: {
          id,
        },
      }))
    ) {
      throw new NotFoundException(`user do id: ${id} não existe`);
    }
  }
}
