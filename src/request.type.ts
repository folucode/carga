import { Request } from 'express';
import { User } from './user/schemas/user.schema';

export interface ApiRequest extends Request {
  user: User;
}
