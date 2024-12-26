import { Injectable, NotFoundException } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  create() {
    return 'This action adds a new user';
  }

  async getProfile(user: User): Promise<UserDto> {
    return new UserDto(await this.userRepo.findOne(user._id));
  }

  async findbyEmail(email: string): Promise<User> {
    const user: User = await this.userRepo.findByEmail(email);

    if (!user) throw new NotFoundException('user no found');

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
