import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { FirebaseGuard } from '../../../shared/guards/firebase.guard';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Req() req) {
    return this.authService.login(req.body.id);
  }

  @Post('check')
  @UseGuards(FirebaseGuard)
  async check(@Req() req) {
    return req.user;
  }
}
