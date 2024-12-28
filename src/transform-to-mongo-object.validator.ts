import { Injectable, InternalServerErrorException, Type } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { InjectConnection } from '@nestjs/mongoose';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import mongoose, { Connection } from 'mongoose';

@ValidatorConstraint({ async: true, name: 'TransformToMongoObject' })
@Injectable()
export class TransformToMongoObjectProvider
  implements ValidatorConstraintInterface
{
  protected invalidValue: Record<string, any> | null;
  protected message: string;
  protected connection: Connection;

  constructor(@InjectConnection() connection: Connection) {
    this.connection = connection;
  }

  protected async transform(
    value: any,
    modelClass: any,
    criteria: Record<string, any>,
    populate: string[] = [],
  ): Promise<Record<string, any>> {
    const _id: string = value.$_id;
    console.log('transform', this.connection);

    const model: mongoose.Model<any> = this.connection.models[modelClass.name];

    const searchCriteria: Record<string, any> = {
      ...criteria,
      _id,
    };

    const modelRow = await model.findOne(searchCriteria).populate(populate);
    value['$mongoRow'] = modelRow;
    value['$_id'] = _id;
    return { $_id: _id, $mongoRow: modelRow };
  }

  async validate(value: any, args: ValidationArguments) {
    this.invalidValue = null;
    this.message = `The ${args.property} does not exist`;
    if (!value) {
      return true;
    }
    if (!Array.isArray(value) && (!value || !value.$_id)) {
      return false;
    }
    const modelClass: any = args?.constraints[0];
    const criteria: Record<string, any> = args?.constraints[1] || {};
    const populate: string[] = args?.constraints[2] || [];
    if (!args.value) {
      return true;
    }
    if (!modelClass.name) {
      throw new InternalServerErrorException(
        `TransformToMongoRow could not determine model name for ${modelClass}`,
      );
    }
    const arrayValue: any[] = Array.isArray(value) ? value : Array(value);
    for (const elem of arrayValue) {
      const transformed = await this.transform(
        elem,
        modelClass,
        criteria,
        populate,
      );
      if (!transformed.$mongoRow) {
        this.message = `The ${args.property} does not exist`;
        return false;
      }
    }
    return true;
  }

  defaultMessage(): string {
    return 'Some IDs are invalid or do not exist';
  }
}

export function TransformToMongoObject<T extends Object>(
  modelName: Type<T>,
  filters: Record<string, any> = {},
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [modelName, filters],
      validator: TransformToMongoObjectProvider,
      async: true,
    });
  };
}
