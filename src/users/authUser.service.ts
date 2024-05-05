import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(
    userdata: CreateUserDto,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(userdata);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.email, username: user.name };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}