import { Injectable } from '@nestjs/common';
import { User } from './dto/user.dto';

@Injectable()
export class UserService {
  private readonly users: User[] = [
    {
      id: 1,
      username: 'Jaazer',
      password: '123456',
    },
    {
      id: 2,
      username: 'Bojie',
      password: '654321',
    },
  ];

  async findUser(username: string): Promise<User> {
    return this.users.find((user) => user.username === username);
  }
}
