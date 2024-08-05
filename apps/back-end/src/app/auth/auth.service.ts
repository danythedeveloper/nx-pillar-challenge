import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../databases/user-database.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.validateUser(email, password);
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const validatedUser = await this.validateUser(user.email, user.password);
    if (this.validateUser) {
      return {
        email: validatedUser.email,
        access_token: this.jwtService.sign(validatedUser),
      };
    } else {
      throw new UnauthorizedException('Invalid Credentials');
    }
  }
}
