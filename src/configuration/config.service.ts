import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigHelperService {
  constructor() {}

  public getOSEnvVar<Type>(name: string): Type {
    const envVar = process.env[name];

    if (!((envVar + '').length > 0)) {
      console.error(`Env var ${name} is missing`);
      throw new Error(`Env var ${name} cannot be empty`);
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
