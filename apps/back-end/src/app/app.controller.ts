import {
  Body,
  Controller,
  Get,
  Post,
  UnauthorizedException,
} from '@nestjs/common';

import { AppService } from './app.service';
import { LoginUserDto } from './dto/login-user.dto';
import { UserService } from './databases/user-database.service';
import { AuthService } from './auth/auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { Public } from './decorators/public.decorator';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  @Public()
  @Get()
  getData() {
    return this.appService.getData();
  }

  @Public()
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Public()
  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    await this.userService.add(registerUserDto);
    return this.authService.login(registerUserDto);
  }

  @Get('users')
  async getUsers() {
    return this.userService.getItems();
  }
}
