import {IsEmail, IsEnum, IsString} from 'class-validator'

enum TaskStatus{
    PENDING,
    IN_PROCESS,
    DONE

}

export class TaskPostDto{

    @IsString()
    name: string
    
    @IsString()
    user: string

    @IsEmail()
    userEmail: never
    
    @IsString()
    taskDescription: string

    @IsEnum(TaskStatus)
    taskStatus: TaskStatus 

}