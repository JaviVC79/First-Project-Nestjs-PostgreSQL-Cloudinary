import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ApiTags } from '@nestjs/swagger';
import { CloudinaryService, Image } from 'src/cloudinary.service';
import { AuthGuard } from 'src/users/auth.guard';
import { Tasks } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@ApiTags('tasks')
@Controller('/tasks')
export class TaskController {
  constructor(
    private tasksService: TasksService,
    private cloudinaryService: CloudinaryService,
  ) {}

  @UseGuards(AuthGuard)
  @Post('sendImage')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 1572864, // 1.5 MB
      },
      storage: diskStorage({
        destination: './uploads/tasksImages',
        filename: (req, file, cb) => {
          cb(null, Date.now() + file.originalname);
        },
      }),
    }),
  )
  async sendImage(@UploadedFile() file, @Body('id') id: string) {
    const image = { file: file.path, id };
    return this.cloudinaryService.uploadImage(image);
  }

  @UseGuards(AuthGuard)
  @Get('getImage')
  getImageByFilename(@Query('filename') filename: string) {
    return this.cloudinaryService.getImageByFilename(filename);
  }

  @UseGuards(AuthGuard)
  @Get('getTask')
  getTask(@Query('userEmail') userEmail: string, @Query('name') name: string) {
    return this.tasksService.getTask(userEmail, name);
  }
  @UseGuards(AuthGuard)
  @Get('getTasks')
  getTasks(@Query('userEmail') userEmail: string) {
    return this.tasksService.getTasks(userEmail);
  }

  @UseGuards(AuthGuard)
  @Post('createTask')
  createTasks(@Body() task: Tasks) {
    return this.tasksService.createTasks(task);
  }

  @UseGuards(AuthGuard)
  @Put('updateTask')
  updateTasks(@Body() task: Tasks) {
    return this.tasksService.updateTasks(task);
  }

  @UseGuards(AuthGuard)
  @Delete('/:taskName/:userEmail')
  deleteTasks(
    @Param('taskName') taskName: string,
    @Param('userEmail') userEmail: string,
  ) {
    return this.tasksService.deleteTasks(taskName, userEmail);
  }

  @Patch()
  updateTasksStatus() {
    return this.tasksService.updateTasksStatus();
  }
}
