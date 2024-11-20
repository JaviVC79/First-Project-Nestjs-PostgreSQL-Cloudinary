import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';
import { HashService } from './hash/hash.service';





@Injectable()
export class UsersService {    
    constructor(private prismaService: PrismaService, private hashService: HashService){}

  getUsers(){
    return this.prismaService.user.findMany({select: {name: true, email: true}}); 
  }
  async getUserByEmail(email:string){
    try{
      const data = await this.prismaService.user.findUnique({where: {email}, select: {name: true, email: true}}); 
      if (!data){
        throw new HttpException(`User with email: ${email} not exist`, HttpStatus.NOT_FOUND);
      }else{
        return data;
      }
    }catch{
      throw new HttpException(`User with email: ${email} not exist`, HttpStatus.NOT_FOUND);
    }
  }

  async createUser(user:CreateUserDto){
    const hash = await this.hashService.getPasswordHash(user.password);
    user.password = hash;
    await this.prismaService.user.create({ data: user });
    return {'name': user.name,'email': user.email};
  }

  async actualizeUser(email: string,userChanges: CreateUserDto){
    if (userChanges.password != null && userChanges.email != '') {
      const hash = await this.hashService.getPasswordHash(userChanges.password)
      userChanges.password = hash;
    }
    await this.prismaService.user.update({ where: {email: email}, data:{name: userChanges.name, password: userChanges.password}})
    return {'message': `User with email: ${email} has been actualize successfully`}

  }

  async findOne(user: CreateUserDto): Promise<CreateUserDto | undefined> {
    try {
      const username = await this.prismaService.user.findUnique({
        where: { email: user.email },
      });
      const isMatch = await bcrypt.compare(user.password, username.password);
      if (isMatch) {
        username.password = user.password
        return username
      };
    } catch (error) {
      console.error(`Error al buscar el usuario: ${error}`);
      return undefined;
    }
  }

  async deleteUsers(email:string){
    try{
      await this.prismaService.user.delete({where: {email}}); 
      return {'message': `User with email: ${email} has been deleted successfully`}
    }catch{
      throw new HttpException(`User with email: ${email} not exist`, HttpStatus.NOT_FOUND);
    }
  }

}



