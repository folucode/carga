import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/schemas/user.schema';
import { RegisterDto } from './dto/register.dto';
import { UserRepository } from 'src/user/repositories/user.repository';
import { comparePassword, hashPassword } from 'src/utils/auth.util';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly userRepo: UserRepository,
    private readonly configService: ConfigService,
  ) {}

  async login(user: User, password: string): Promise<{ access_token: string }> {
    if (!comparePassword(password, user.password)) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user._id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: this.configService.get('auth.secret'),
        expiresIn: this.configService.get('auth.expiresIn'),
      }),
    };
  }

  async register(data: RegisterDto): Promise<{ access_token: string }> {
    const existingUser: User = await this.userRepo.findByEmail(data.email);

    if (existingUser)
      throw new BadRequestException(
        `user with email: ${data.email} already exists`,
      );

    const hashedPassed: string = await hashPassword(data.password);

    const user: User = await this.userRepo.create({
      ...data,
      password: hashedPassed,
    });

    const payload = {
      sub: user._id,
      isLogggedIn: true,
    };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: this.configService.get('auth.secret'),
        expiresIn: this.configService.get('auth.expiresIn'),
      }),
    };
  }
}
