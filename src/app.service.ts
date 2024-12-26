import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configSetrvice: ConfigService) {}
  getHello(): string {
    return 'Hello World! Here!' + this.configSetrvice.get('database.mongoUrl');
  }
}
