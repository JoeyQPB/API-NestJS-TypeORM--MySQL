import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user-dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user-dto';
import { UpdatePutUserDTO } from './dto/update-put-user-dto';
import * as bcrypt from 'bcrypt';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async create(data: CreateUserDTO) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(data.password, salt);

    data.password = hashedPassword;

    return this.usersRepository.create(data);
  }

  async getAllUsers() {
    return this.usersRepository.find();
  }

  async getOneUser(id: number) {
    await this.exists(id);

    return this.usersRepository.findOneBy({ id });
  }

  async update(
    id: number,
    { name, email, password, birthAt, role }: UpdatePutUserDTO,
  ) {
    await this.exists(id);

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    password = hashedPassword;

    return this.usersRepository.update(id, {
      name,
      email,
      password,
      birthAt: birthAt ? new Date(birthAt) : null,
      role,
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

    return this.usersRepository.update(id, data);
  }

  async delete(id: number) {
    await this.exists(id);

    return this.usersRepository.delete({ id });
  }

  async exists(id: number) {
    if (
      !(await this.usersRepository.exist({
        where: { id },
      }))
    ) {
      throw new NotFoundException(`user do id: ${id} não existe`);
    }
  }
}
