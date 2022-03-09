import { Injectable } from '@nestjs/common';
import { PatternDto } from './dto/pattern.dto';
import { PatternCommands } from './pattern.commands';

@Injectable()
export class PatternXService {
  constructor(private readonly patternCommands: PatternCommands) {}
  private mergePatterns = (forwardSlant: any[], backwardSlant: any[]) => {
    // merged pattern
    const mergedPattern: any[] = [];
    forwardSlant.forEach((arrayList: [], index) => {
      const backwardArrayList: [] = backwardSlant[index];
      const mergedLetter = [];

      // forward slanting line
      arrayList.forEach((letter: string) => {
        mergedLetter.push(letter);
      });

      // backward slanting line
      backwardArrayList.forEach((letter: string, letterIndex: number) => {
        if (letter !== this.patternCommands.spaceValue)
          mergedLetter[letterIndex] = letter;
      });
      mergedPattern.push(mergedLetter);
    });
    return mergedPattern;
  };

  interpretPattern(pattern: PatternDto): any[] {
    if (pattern.letter === 'x' || pattern.letter === 'X') {
      const forwardSlant: any[] = this.patternCommands.createForwardSlant(
        pattern.size,
      );
      const backwardSlant: any[] = this.patternCommands.createBackwardSlant(
        pattern.size,
      );
      const mergedPattern: any[] = this.mergePatterns(
        forwardSlant,
        backwardSlant,
      );
      return mergedPattern;
    } else {
      return [];
    }
  }
}
