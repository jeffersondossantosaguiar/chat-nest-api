import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) { }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async getProfile(@Request() req) {
    return await this.userService.findOne(req.user.email);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  async getUser(@Param('userId') userId: string) {
    return await this.userService.findUserById(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/friends/:userId')
  async getFriends(@Param('userId') userId: string) {
    return await this.userService.getFriends(userId);
  }
}
