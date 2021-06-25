import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserPayload } from '../users/models/user-payload';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async validateUser(email: string, pass: string): Promise<UserPayload> {
    const user = await this.usersService.findOne(email);

    const isPasswordMatching = await bcrypt.compare(
      pass,
      user.password
    );
    if (!isPasswordMatching) {
      throw new BadRequestException('Wrong credentials');
    }

    user.password = undefined;

    return user;
  }

  async login(user: any) {
    const payload = { email: user.email, id: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
      user: user
    };
  }
}