import { Module } from '@nestjs/common';
import { TaskController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { PrismaService } from 'src/prisma.service';
import { CloudinaryService } from 'src/cloudinary.service';

@Module({
    controllers: [TaskController],
    providers: [TasksService, PrismaService, CloudinaryService],
})
export class TaskModule {}