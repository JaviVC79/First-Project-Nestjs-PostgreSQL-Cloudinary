import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { TasksService } from 'src/tasks/tasks.service';

@Module({
  imports: [],
  controllers: [],
  providers: [CloudinaryService, TasksService],
  exports: [CloudinaryService],
})
export class CloudinaryModule {}
