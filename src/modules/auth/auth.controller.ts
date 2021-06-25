import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { UserPayload } from '../users/models/user-payload';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async createUser(@Body() payload: UserPayload) {
    return await this.userService.create(payload);
  }
}
