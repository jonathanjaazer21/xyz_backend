import { Injectable } from '@nestjs/common';
import { PatternDto } from './dto/pattern.dto';

@Injectable()
export class PatternZService {
  private spaceValue = ' ';
  // produce an array of "o" and ""
  private filledWithValue = (count: number, _size: number) => {
    const arrayList = [];
    const containerList = new Array(_size)
      .fill('')
      .map((n, index) => index + 1);

    containerList.forEach((containerCount) => {
      if (count === containerCount) {
        arrayList.push('o');
      } else {
        arrayList.push(this.spaceValue);
      }
    });
    return arrayList;
  };

  private createStraightLine(_size: number) {
    return new Array(_size).fill('').map(() => 'o');
  }

  private createBackwardSlant(_size: number) {
    const pattern: any[] = [];
    // line forward pattern
    for (let count = _size; count >= 1; count--) {
      const listOfValue: string[] = this.filledWithValue(count, _size);
      pattern.push([...listOfValue]);
    }
    return pattern;
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
      const backwardSlant: any[] = this.createBackwardSlant(pattern.size);
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
