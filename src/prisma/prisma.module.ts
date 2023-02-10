import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService], // faz parte desse modulo (dessa caixinha)
  exports: [PrismaService], // quem usar essse modulo tem acesso a esses exports
})
export class PrismaModule {}
