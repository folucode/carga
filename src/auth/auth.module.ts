import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { Config } from 'src/configuration/config.type';
import configuration from '../configuration/config';

const config: Config = configuration();

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: config.auth.secret,
      signOptions: { expiresIn: config.auth.expiresIn },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserModule],
})
export class AuthModule {}
