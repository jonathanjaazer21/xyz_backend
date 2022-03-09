import { Injectable } from '@nestjs/common';
import { PatternDto } from './dto/pattern.dto';
import { PatternCommands } from './pattern.commands';

@Injectable()
export class PatternZService {
  constructor(private readonly patternCommands: PatternCommands) {}

  private createStraightLine(_size: number) {
    return new Array(_size).fill('').map(() => 'o');
  }

  private mergePatterns(
    backwardSlant: any[],
    straightLine: any[],
    size: number | 0,
  ) {
    // merged pattern
    const mergedPattern = [];
    backwardSlant.forEach((arrayList, index) => {
      let mergedLetter = [];

      // backward slanting line
      arrayList.forEach((letter) => {
        mergedLetter.push(letter);
      });

      if (index === 0) {
        mergedLetter = straightLine;
      }
      if (index === size - 1) {
        mergedLetter = straightLine;
      }
      mergedPattern.push(mergedLetter);
    });
    return mergedPattern;
  }

  interpretPattern(pattern: PatternDto): any[] {
    if (pattern.letter === 'z' || pattern.letter === 'Y') {
      const backwardSlant: any[] = this.patternCommands.createBackwardSlant(
        pattern.size,
      );
      const straightLine = this.createStraightLine(pattern.size);
      const mergedPattern: any[] = this.mergePatterns(
        backwardSlant,
        straightLine,
        pattern.size,
      );
      return mergedPattern;
    } else {
      return [];
    }
  }
}
