import { Injectable, Type } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: true })
@Injectable()
export class TransformToObjectConstraint<T>
  implements ValidatorConstraintInterface
{
  constructor(
    private readonly service: {
      findById: (id: string) => Promise<T | null>;
      findByIds: (ids: string[]) => Promise<T[]>;
    },
  ) {}

  async validate(idsOrId: string | string[], args: any): Promise<boolean> {
    if (!idsOrId) return false;

    const { object, property } = args;
    if (Array.isArray(idsOrId)) {
      const records = await this.service.findByIds(idsOrId);
      if (records.length === idsOrId.length) {
        object[property] = records;
        return true;
      }
    } else {
      const record = await this.service.findById(idsOrId);
      if (record) {
        object[property] = record;
        return true;
      }
    }
    return false;
  }

  defaultMessage(): string {
    return 'Some IDs are invalid or do not exist';
  }
}

export function TransformToObject<T>(
  service: Type<{
    findById: (id: string) => Promise<T | null>;
    findByIds: (ids: string[]) => Promise<T[]>;
  }>,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [service],
      validator: TransformToObjectConstraint,
      async: true,
    });
  };
}
