import { Module } from '@nestjs/common';
import { ConfigHelperService } from './config.service';
import { Config } from './config.type';
import configuration from './config';

const appConfig: Config = configuration();

@Module({
  providers: [
    ConfigHelperService,
    {
      provide: 'Config',
      useValue: appConfig,
    },
  ],
  exports: ['Config'],
})
export class ConfigurationModule {}
