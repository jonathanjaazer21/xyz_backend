import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findUser(username, password);
    if (user) {
      return { id: user.id, username: user.username };
    }
  }

  async login(user: any) {
    const payload = { user: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
