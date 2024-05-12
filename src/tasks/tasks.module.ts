import { Module } from '@nestjs/common';
import { TaskController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { PrismaService } from 'src/prisma.service';
import { CloudinaryService } from 'src/cloudinary.service';
import { AuthService } from 'src/users/authUser.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/users/constants';
import { UsersService } from 'src/users/users.service';
import { HashService } from 'src/users/hash/hash.service';

@Module({  
    imports: [ JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '60s' },
  }),
],
    controllers: [TaskController],
    providers: [TasksService, PrismaService, CloudinaryService, AuthService, UsersService, HashService],
})
export class TaskModule {}