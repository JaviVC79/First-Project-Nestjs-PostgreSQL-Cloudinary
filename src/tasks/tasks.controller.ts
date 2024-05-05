import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { ApiTags } from "@nestjs/swagger";
import { CloudinaryService } from "src/cloudinary.service";


@ApiTags('tasks')
@Controller('/tasks')
export class TaskController{
    
    constructor (private tasksService: TasksService, private cloudinaryService: CloudinaryService){}

    @Get('getImage')
    getImageByFilename(@Query('filename') filename: string){
        return this.cloudinaryService.getImageByFilename(filename);
    }

    @Get('getTask')
    getTask(@Query('userEmail') userEmail: string, @Query('name')name: string){
        return this.tasksService.getTask(userEmail, name);
    }

    @Get('getTasks')
    getTasks(@Query('userEmail') userEmail: string){
        return this.tasksService.getTasks(userEmail);
    }

    @Post()
    createTasks(@Body() task : any){
        return this.tasksService.createTasks(task);
    }

    @Put()
    updateTasks(@Param() id : string){
        return this.tasksService.updateTasks(id);
    }

    @Delete('/:id')
    deleteTasks(@Param('id') id : string){
        return this.tasksService.deleteTasks(id);
    }

    @Patch()
    updateTasksStatus(){
        return this.tasksService.updateTasksStatus();
    }
}