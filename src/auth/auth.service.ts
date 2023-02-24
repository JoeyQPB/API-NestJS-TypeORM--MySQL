import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/entity/user.entity';
import { CreateUserDTO } from '../user/dto/create-user-dto';

@Injectable()
export class AuthService {
  private readonly issuer = 'API NESTJS - login';
  private readonly audience = 'users';

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly mailer: MailerService,
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  // module (schema) vira um DTO
  createToken(user: UserEntity) {
    return {
      accessToken: this.jwtService.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        {
          expiresIn: '1 day',
          subject: String(user.id),
          issuer: this.issuer,
          audience: this.audience,
        },
      ),
    };
  }

  checkToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        issuer: this.issuer,
        audience: this.audience,
      });

      return data;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  isValidToken(token: string) {
    try {
      this.checkToken(token);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async login(email: string, password: string) {
    const user = await this.usersRepository.findOneBy({ email });

    if (!user) {
      throw new NotFoundException('Email/Password incorrect');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new NotFoundException('Email/Password incorrect');
    }

    return this.createToken(user);
  }

  async forgetPassword(email: string) {
    const user = await this.usersRepository.findOneBy({ email });

    if (!user) {
      throw new NotFoundException('email not found');
    }

    const token = this.jwtService.sign(
      { id: user.id },
      {
        expiresIn: '10 minutes',
        subject: String(user.id),
        issuer: 'forget',
        audience: this.audience,
      },
    );

    await this.mailer.sendMail({
      subject: 'Recuperação de senha',
      to: user.email,
      template: '../templates/forget.pug',
      context: {
        name: user.name,
        token: token,
      },
    });

    return { send: true };
  }

  async resetPassword(password: string, token: string) {
    try {
      const data: any = this.jwtService.verify(token, {
        issuer: 'forget',
        audience: this.audience,
      });

      if (isNaN(Number(data.id))) {
        return new BadRequestException('token inválido');
      }

      const salt = await bcrypt.genSalt();
      password = await bcrypt.hash(String(data.password), salt);

      await this.usersRepository.update(Number(data.id), {
        password,
      });

      const user = await this.userService.getOneUser(Number(data.id));

      return this.createToken(user);
    } catch (err) {
      console.log(err);
      throw new BadRequestException(err);
    }
  }

  async register(data: CreateUserDTO) {
    const user = await this.userService.create(data);
    return this.createToken(user);
  }
}
