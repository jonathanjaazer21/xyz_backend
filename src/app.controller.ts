import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { EntriesDto } from './dto';

@Controller('xyz')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
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
