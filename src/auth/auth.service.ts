import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async createToken() {
    //     return this.jwtService.sign();
  }

  async checkToken(token: string) {
    //     return this.jwtService.verify();
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
        password,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async forgetPassword(email: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException('email not found');
    }

    //TO DO: enviar email...

    return true;
  }

  async resetPassword(password: string, token: string) {
    // TODO: validar token
    // TODO: trocar senha id vem do token
    const id = 0;

    await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        password,
      },
    });
  }
}
