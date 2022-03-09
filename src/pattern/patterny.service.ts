import { Injectable } from '@nestjs/common';
import { PatternDto } from './dto/pattern.dto';

@Injectable()
export class PatternYService {
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
        arrayList.push(this.spaceValue);
      }
    });
    return arrayList;
  };

  private createForwardSlant = (_size: number) => {
    const pattern: any[] = [];
    // line forward pattern
    for (let count = 1; count <= _size; count++) {
      const listOfValue: string[] = this.filledWithValue(count, _size);
      pattern.push([...listOfValue]);
    }
    return pattern;
  };

  private createBackwardSlant = (_size: number) => {
    const pattern: any[] = [];
    // line forward pattern
    for (let count = _size; count >= 1; count--) {
      const listOfValue: string[] = this.filledWithValue(count, _size);
      pattern.push([...listOfValue]);
    }
    return pattern;
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
        if (letter !== this.spaceValue) mergedLetter[letterIndex] = letter;
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
      const forwardSlant: any[] = this.createForwardSlant(pattern.size);
      const backwardSlant: any[] = this.createBackwardSlant(pattern.size);
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
