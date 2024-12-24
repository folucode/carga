import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigHelperService {
  constructor() {}

  public getOSEnvVar<Type>(name: string): Type {
    const envVar = process.env[name];

    if (!((envVar + '').length > 0)) {
      throw new Error(`Env cvar ${name} cannot be empty`);
    }

    return envVar as Type;
  }

  public getOSOptionalEnvVar<Type>(
    name: string,
    defaultvalue?: Type,
  ): Type | undefined {
    return (process.env[name] as Type) || defaultvalue;
  }
}
