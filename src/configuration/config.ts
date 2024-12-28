import { ConfigHelperService } from './config.service';
import { Config } from './config.type';
import * as dotenv from 'dotenv';

const configHelper: ConfigHelperService = new ConfigHelperService();

dotenv.config({})

export default (): Config => ({
  port: configHelper.getOSOptionalEnvVar('PORT', 3000),
  database: {
    mongoUrl: configHelper.getOSEnvVar<string>('MONGO_URL'),
  },
  auth: {
    secret: configHelper.getOSEnvVar<string>('JWT_SECRET'),
    expiresIn: configHelper.getOSEnvVar<number>('EXPIRES_IN')
  },
});
