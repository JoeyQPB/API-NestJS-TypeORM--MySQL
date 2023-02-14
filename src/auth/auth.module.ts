import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  imports: [
    JwtModule.register({
      secret: 'u2UPFBJ0BSiySI^Q@V*Q0C46r87DX^$B',
    }),
    UserModule,
    PrismaModule,
  ],
})
export class AuthModule {}
