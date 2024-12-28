import { Module } from '@nestjs/common';
import { TransformToMongoObjectProvider } from './transform-to-mongo-object.validator';

@Module({
  providers: [TransformToMongoObjectProvider],
  exports: [TransformToMongoObjectProvider],
})
export class ValidatorsModule {}
