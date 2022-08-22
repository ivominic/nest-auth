import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { Role } from './users/entities/role.enum';
import { Roles } from './users/roles.decorator';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req): any {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getHello(@Request() req): string {
    return req.user;
  }

  @Get('roles')
  @Roles(Role.ADMIN)
  getRoles(@Request() req): string {
    //return req.user;
    return 'OK';
  }
}
