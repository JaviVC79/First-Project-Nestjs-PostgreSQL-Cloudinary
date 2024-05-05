import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthService } from './authUser.service';
import { HashService } from './hash/hash.service';


@Module({
  imports: [ JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '60s' },
  }),
],
  controllers: [UsersController],
  providers: [UsersService, PrismaService, AuthService, HashService]
})
export class UsersModule {}
