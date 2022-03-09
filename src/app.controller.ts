import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local.guard';
import { AuthService } from './auth/auth.service';
import { EntriesDto } from './dto';
import { JwtGuard } from './auth/jwt.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req): any {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtGuard)
  @Post('xyz')
  createXyz(@Body() body: EntriesDto): any {
    const drawing: [] = this.appService.interpretPattern(body);
    drawing.forEach((lineRow: any[]) => {
      console.log(lineRow.join(' '));
    });
    return {
      message:
        'Please open the console on the backend to see the output result',
    };
  }
}
