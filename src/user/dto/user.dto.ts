import { User } from '../schemas/user.schema';

export class UserDto {
  firstName: string;
  lastName: string;
  email: string;
  isAuthor: boolean;

  constructor(user: User) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.isAuthor = user.isAuthor;
  }
}
