import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatternModule } from './pattern/pattern.module';

@Module({
  imports: [PatternModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
