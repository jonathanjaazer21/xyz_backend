import { Injectable } from '@nestjs/common';
import { PatternDto } from './dto/pattern.dto';
import { PatternCommands } from './pattern.commands';

@Injectable()
export class PatternYService {
  constructor(private readonly patternCommands: PatternCommands) {}

  // produce an array of "o" and ""
  private handleHalfVerticalStraightLine = (
    count: number,
    _size: number,
    halfCountSize: number,
  ) => {
    const arrayList = [];
    const containerList = new Array(_size)
      .fill('')
      .map((n, index) => index + 1);

    containerList.forEach((containerCount) => {
      if (containerCount === halfCountSize && count <= halfCountSize) {
        arrayList.push('o');
      } else {
        arrayList.push(this.patternCommands.spaceValue);
      }
    });
    return arrayList;
  };

  private createHalfVerticalStraight = (
    _size: number,
    halfCountSize: number,
  ) => {
    const pattern: any[] = [];
    // line downward pattern
    for (let count = _size; count >= 1; count--) {
      pattern.push(
        this.handleHalfVerticalStraightLine(count, _size, halfCountSize),
      );
    }
    return pattern;
  };

  private mergePatterns(
    forwardSlant: any[],
    backwardSlant: any[],
    verticalStraight: any[],
    halfCountSize: number | 0,
  ) {
    // merged pattern
    const mergedPattern: any[] = [];
    forwardSlant.forEach((arrayList: [], index) => {
      const backwardArrayList: [] = backwardSlant[index];
      const downwardArrayList: [] = verticalStraight[index];
      let mergedLetter = [];

      // forward slanting line
      arrayList.forEach((letter: string) => {
        mergedLetter.push(letter);
      });

      // backward slanting line
      backwardArrayList.forEach((letter: string, letterIndex: number) => {
        if (letter !== this.patternCommands.spaceValue)
          mergedLetter[letterIndex] = letter;
      });

      // downward strain line
      if (halfCountSize <= index) {
        mergedLetter = downwardArrayList;
      }
      mergedPattern.push(mergedLetter);
    });
    return mergedPattern;
  }

  interpretPattern(pattern: PatternDto): any[] {
    if (pattern.letter === 'y' || pattern.letter === 'Y') {
      const halfCountSize = pattern.size / 2 + 0.5;
      const forwardSlant: any[] = this.patternCommands.createForwardSlant(
        pattern.size,
      );
      const backwardSlant: any[] = this.patternCommands.createBackwardSlant(
        pattern.size,
      );
      const verticalStraight = this.createHalfVerticalStraight(
        pattern.size,
        halfCountSize,
      );
      const mergedPattern: any[] = this.mergePatterns(
        forwardSlant,
        backwardSlant,
        verticalStraight,
        halfCountSize,
      );
      return mergedPattern;
    } else {
      return [];
    }
  }
}
