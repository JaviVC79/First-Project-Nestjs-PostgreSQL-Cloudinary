import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Tasks, User, TasksImage } from '@prisma/client';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

@Injectable()
export class TasksService {

  constructor(private prismaService: PrismaService) { }

  async createTaskImage(taskImage: TasksImage) {
    const { id, secure_url } = taskImage;
    if (id === '') throw HttpException.createBody('An id is required', '', 409);
    try {
      await this.prismaService.tasksImage.create({
        data: { id, secure_url },
      });
      return 'Image stored';
    } catch (error) {
      throw HttpException.createBody(
        'Only one image for task allowed',
        error.code,
        409,
      );
    }
  }
  async deleteTaskImage(id: string) {
    if (id === '') throw HttpException.createBody('An id is required', '', 409);
    try {
      await this.prismaService.tasksImage.delete({
        where: { id },
      });
      return 'Image removed';
    } catch (error) {
      throw HttpException.createBody('Image not removed', error.code, 409);
    }
  }

  async getTasks(userEmail: string): Promise<any[] | any | undefined> {
    try {
      if (userEmail === undefined) {
        return { 'message:': "Valid email is required as query 'userEmail'" };
      }
      const findEmail: User = await this.prismaService.user.findUnique({
        where: { email: userEmail },
      });
      const findTasks: Tasks[] = await this.prismaService.tasks.findMany({
        where: { userEmail: findEmail.email },
      });
      if (findTasks.length > 1) {
        const tasks = findTasks.map((task) => {
          return {
            name: task.name,
            taskDescription: task.taskDescription,
            taskStatus: task.taskStatus,
            taskUpdatedAt: task.updatedAt,
          };
        });
        return tasks;
      } else if (findTasks.length == 1) {
        const task = findTasks[0];
        return [
          {
            name: task.name,
            taskDescription: task.taskDescription,
            taskStatus: task.taskStatus,
            taskUpdatedAt: task.updatedAt,
          },
        ];
      } else {
        return {
          'message:':
            "No tasks found, valid email is required as query 'userEmail'",
        };
      }
    } catch (error) {
      console.error(`Error al buscar el usuario: ${error}`);
      return HttpErrorByCode;
    }
  }

  async getTask(userEmail: string, name: string): Promise<any | undefined> {
    try {
      if (userEmail === undefined) {
        return { 'message:': "Valid email is required as query 'userEmail'" };
      }
      if (name === undefined) {
        return { 'message:': "Valid task name is required as query 'name'" };
      }
      const task: Tasks = await this.prismaService.tasks.findFirst({
        where: { userEmail: userEmail, name: name },
      });
      if (task != undefined) {
        return {
          id: task.id,
          name: name,
          taskDescription: task.taskDescription,
          taskStatus: task.taskStatus,
          taskUpdatedAt: task.updatedAt,
        };
      } else {
        return { 'message:': 'No task found' };
      }
    } catch (error) {
      console.error(`Error al buscar el usuario: ${error}`);
      return undefined;
    }
  }

  async getTaskById(id: string) {
    try {
      const response = this.prismaService.tasks.findUnique({
        where: { id },
      });
      return response;
    } catch (error) { 
      console.log(error);
      return error;
    }
  }

  async createTasks(task: Tasks) {
    const { name, userEmail, taskDescription, taskStatus } = task;
    if (name === '')
      throw HttpException.createBody('A task name is required', '', 409);
    try {
      const user = await this.prismaService.user.findUnique({
        where: { email: userEmail },
      });
      if (!user) {
        throw new Error('User not found');
      }
      await this.prismaService.tasks.create({
        data: {
          name: name,
          userEmail: userEmail,
          taskDescription: taskDescription,
          taskStatus: taskStatus,
        },
      });
      return name;
    } catch (error) {
      throw HttpException.createBody(
        'A previous task was called the same name',
        error.code,
        409,
      );
    }
  }

  async updateTasks(task: Tasks) {
    try {
      if (task.userEmail == undefined) {
        return HttpException.createBody(
          `An error occurred, a valid email is required`,
          'email is undefined',
          404,
        );
      }
      const { id, name, taskDescription, taskStatus } = task;
      const taskUpdated = await this.prismaService.tasks.update({
        where: { id },
        data: { name, taskDescription, taskStatus },
      });
      if (!taskUpdated) return { message: `Task ${task.name} doesn’t exist` };
      return { message: `Task ${task.name} has been updated successfully` };
    } catch (error) {
      throw HttpException.createBody(
        `An error occurred, maybe the task ${task.name} doesn’t exist`,
        `DB_ERROR_CODE: ${error.code}`,
        404,
      );
    }
  }

  async deleteTasks(taskName: string, userEmail: string) {
    try {
      const taskId = await this.prismaService.tasks.findFirst({
        where: {
          name: taskName,
          userEmail: userEmail,
        },
        select: { id: true },
      });
      await this.prismaService.tasks.delete({ where: { id: taskId.id } });
      try {
        const response = await this.prismaService.tasksImage.findUnique({
          where: { id: taskId.id },
        });
        if (response.secure_url != undefined) {
          console.log('secure_url');
          const secure_url = response.secure_url;
          await this.prismaService.tasksImage.delete({
            where: { id: taskId.id },
          });
          await this.deleteTaskImage(secure_url);
        }
      } catch {
        return {
          'message:': `taskName ${taskName} has been deleted successfully`,
        };
      }
      return {
        'message:': `taskName ${taskName} has been deleted successfully`,
      };
    } catch {
      throw new HttpException(
        `taskName: ${taskName} not exist`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
  updateTasksStatus() {
    return 'modificando un parte de la tarea';
  }

  async getImage(id: string) {
    try {
      const response = await this.prismaService.tasksImage.findUnique({
        where: { id },
      });
      const secure_url = response?.secure_url;
      return secure_url;
    } catch (e) {
      console.log(e);
      return e;
    }
  }
}
