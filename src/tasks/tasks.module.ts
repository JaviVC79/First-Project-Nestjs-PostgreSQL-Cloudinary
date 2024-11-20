import { Module } from '@nestjs/common';
import { TaskController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { PrismaService } from '../prisma.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { AuthService } from '../users/authUser.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../users/constants';
import { UsersService } from '../users/users.service';
import { HashService } from '../users/hash/hash.service';

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