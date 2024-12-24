import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/schemas/user.schema';
import { RegisterDto } from './dto/register.dto';
import { Public } from 'src/public.decorator';

@Controller('auth')
@Public()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  async create(@Body() loginDto: LoginDto): Promise<{
    access_token: string;
  }> {
    const user: User = await this.userService.findbyEmail(loginDto.email);

    return this.authService.login(user, loginDto.password);
  }

  @Post('register')
  async register(@Body() data: RegisterDto): Promise<{
    access_token: string;
  }> {
    return this.authService.register(data);
  }
}
