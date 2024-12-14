import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/schemas/user.schema';
import { RegisterDto } from './dto/register.dto';
import { UserRepository } from 'src/user/repositories/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly userRepo: UserRepository,
  ) {}

  async login(user: User, password: string): Promise<{ access_token: string }> {
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user._id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(data: RegisterDto): Promise<{ access_token: string }> {
    const existingUser: User = await this.userRepo.findByEmail(data.email);

    if (existingUser)
      throw new BadRequestException(
        `user with email: ${data.email} already exists`,
      );

    const user: User = await this.userRepo.create(data);

    return {
      access_token: await this.jwtService.signAsync(user),
    };
  }
}
