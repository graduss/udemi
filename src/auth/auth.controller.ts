import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signup(@Body() signDto: SignupDto) {
    return this.authService.signup(signDto.email, signDto.password);
  }

  @Post('/signin')
  signin(@Body() dto: SignupDto) {
    return this.authService.signin(dto.email, dto.password);
  }
}
