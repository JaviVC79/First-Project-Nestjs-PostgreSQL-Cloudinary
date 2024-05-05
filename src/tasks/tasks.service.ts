import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { Tasks } from "@prisma/client";


export interface User {
    id: number;
    name: string;
    age: number;

}




@Injectable()
export class TasksService {
    constructor(private prismaService: PrismaService){}
    private tasks = []
    
          
    async getTasks(userEmail: string): Promise<any[] | any | undefined> {
        try {
          const findTasks: Tasks[] = await this.prismaService.tasks.findMany({
            where: { userEmail: userEmail, },
          });
          if (findTasks.length > 1) {
          const tasks = findTasks.map((task) => {
            return {'taskDescription': task.taskDescription, 'taskStatus': task.taskStatus, 'taskUpdatedAt': task.updatedAt}
          })
          return tasks} else{
            const task = findTasks[0];
            return {'taskDescription': task.taskDescription, 'taskStatus': task.taskStatus, 'taskUpdatedAt': task.updatedAt}}
        } catch (error) {
          console.error(`Error al buscar el usuario: ${error}`);
          return undefined;
        }
      
    }

    async getTask(userEmail: string, name: string): Promise<any | undefined> {
        try {
          const task: Tasks = await this.prismaService.tasks.findFirst({
            where: { userEmail: userEmail, name: name },
          });
          return {'taskDescription': task.taskDescription, 'taskStatus': task.taskStatus, 'taskUpdatedAt': task.updatedAt}
        } catch (error) {
          console.error(`Error al buscar el usuario: ${error}`);
          return undefined;
        }
      }


    async createTasks(task:any){
        const user = await this.prismaService.user.findUnique({ where: { email: task.userEmail } });
        const name = task.name;
        const taskDescription = task.taskDescription;
        const taskStatus = task.taskStatus
        if (!user) {
        throw new Error('User not found');
        }

        await this.prismaService.tasks.create({
            data: {
                name: name,
                userEmail: user.email,
                taskDescription: taskDescription,
                taskStatus: taskStatus
            },
        });

        return name
        //this.tasks.push({id: this.tasks.length + 1, ...task})
        //return task;
    }

    updateTasks(id:string){
        console.log(`updatetask ${id}`)
        return 'actualizando tareas'
    }

    deleteTasks(id:string){
        let encontrado ={} 
        this.tasks.forEach((elem) =>{
            console.log(elem.id)
        if (id[0]== elem.id.toString()){encontrado = elem}})
            console.log(id[0])
        console.log(`deletetask: ${encontrado}`)
        return encontrado;
    }
    updateTasksStatus(){
        return 'modificando un parte de la tarea';
    }
}