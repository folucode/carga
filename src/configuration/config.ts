import { ConfigHelperService } from './config.service';
import { Config } from './config.type';

const configHelper: ConfigHelperService = new ConfigHelperService();

export default (): Config => ({
  port: configHelper.getOSOptionalEnvVar('PORT', 3000),
  database: {
    mongoUrl: configHelper.getOSEnvVar('MONGO_URL'),
  },
});
