import { Module } from '@nestjs/common';
import { PatternCommands } from './pattern.commands';
import { PatternXService } from './patternx.service';
import { PatternYService } from './patterny.service';
import { PatternZService } from './patternz.service';

@Module({
  providers: [
    PatternXService,
    PatternYService,
    PatternZService,
    PatternCommands,
  ],
  exports: [PatternXService, PatternYService, PatternZService],
})
export class PatternModule {}
