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

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Public()
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.authService.validateUser(
      loginUserDto.email,
      loginUserDto.password
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @Public()
  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    console.log('Register');
    await this.userService.add(registerUserDto);
    return { message: 'User registered successfully' };
  }

  @Public()
  @Get('test-register')
  async testRegister() {
    const registerUserDto: RegisterUserDto = {
      name: 'Test User',
      email: 'test.user@example.com',
      password: 'password123',
    };
    await this.userService.add(registerUserDto);
    return { message: 'User registered successfully' };
  }
}
