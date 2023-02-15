import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  imports: [
    JwtModule.register({
      secret: process.env.TOKEN_SECRET,
    }),
    forwardRef(() => UserModule),
    PrismaModule,
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
