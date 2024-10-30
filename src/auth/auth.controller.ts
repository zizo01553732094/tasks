import { Controller, Post, Body, Request } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body: any) {
    return this.authService.signup(body.name, body.email, body.password);
  }

  @Post('signin')
  async signin(@Body() body: any) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      return { message: 'Invalid credentials' };
    }
    return this.authService.login(user);
  }

  @Post('refresh-token')
  async refreshToken(@Body() body: any) {
    return { message: 'Token refreshed', access_token: 'new_token', refresh_token: 'new_refresh_token' };
  }
}
