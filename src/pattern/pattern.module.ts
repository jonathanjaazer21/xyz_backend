import { Module } from '@nestjs/common';
import { PatternXService } from './patternx.service';
import { PatternYService } from './patterny.service';
import { PatternZService } from './patternz.service';

@Module({
  providers: [PatternXService, PatternYService, PatternZService],
  exports: [PatternXService, PatternYService, PatternZService],
})
export class PatternModule {}
