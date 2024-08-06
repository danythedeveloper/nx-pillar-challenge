import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { AbstractDatabaseService } from './abstract-database.service';
import { User } from '../model/types/user.type';
import { randomBytes, pbkdf2Sync } from 'crypto';

interface UserDatabase {
  users: User[];
}

@Injectable()
export class UserService extends AbstractDatabaseService<UserDatabase> {
  constructor() {
    super('users.json', { users: [] });
  }

  async getItems(): Promise<Omit<User, 'password'>[]> {
    await this.db.read();
    return this.db.data.users.map(({ password, ...user }) => user);
  }

  async add(user: Omit<User, 'id'>) {
    await this.db.read();
    const existingUser = this.db.data.users.find((u) => u.email === user.email);
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const id = Date.now().toString();
    const salt = randomBytes(16).toString('hex');
    const hashedPassword = pbkdf2Sync(
      user.password,
      salt,
      1000,
      64,
      'sha512'
    ).toString('hex');
    this.db.data.users.push({
      ...user,
      id,
      password: `${salt}:${hashedPassword}`,
    });
    await this.db.write();
  }

  async validateUser(email: string, password: string): Promise<User> {
    await this.db.read();
    const user = this.db.data.users.find((u) => u.email === email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const [salt, storedHash] = user.password.split(':');
    const hashedPassword = pbkdf2Sync(
      password,
      salt,
      1000,
      64,
      'sha512'
    ).toString('hex');
    if (storedHash !== hashedPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }
}
