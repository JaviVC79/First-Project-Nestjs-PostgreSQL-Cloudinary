import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, Request, Delete, Param, Patch, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './authUser.service';
import { AuthGuard } from './auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('users')
@Controller()
export class UsersController {
    constructor(private usersService: UsersService, private authService: AuthService){}

    @UseGuards(AuthGuard)
    @Get('/users')
    getUsers(){
        return this.usersService.getUsers();
    }

    @UseGuards(AuthGuard)
    @Get('/users/:email')
    getUserByEmail(@Param('email') email: string){
        return this.usersService.getUserByEmail(email);
    }
        
    @Post('/users')
    createUser(@Body() user: CreateUserDto){
        print(user)
        return this.usersService.createUser(user);
    }

    @Patch('/users/:email')
    actualizeUser(@Param('email') email: string, @Body() userChanges: CreateUserDto){
      return this.usersService.actualizeUser(email, userChanges);
    }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: CreateUserDto, @Res({ passthrough: true }) response: Response) {
    const userJwt = this.authService.signIn(signInDto, signInDto.password);
    response.cookie('jwt', userJwt)
    response.cookie('userEmail', signInDto.email)
    return userJwt
  }
  /*findAll(@Res({ passthrough: true }) response: Response) {
    response.cookie('key', 'value')*/
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Delete('/users/:email')
  deleteUser(@Param('email') email: string){
      return this.usersService.deleteUsers(email);
  }
  
}
