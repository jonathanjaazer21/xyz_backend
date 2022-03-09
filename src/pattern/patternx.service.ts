import { Injectable } from '@nestjs/common';
import { PatternDto } from './dto/pattern.dto';

@Injectable()
export class PatternXService {
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

  private createForwardSlant(_size: number) {
    const pattern: any[] = [];
    // line forward pattern
    for (let count = 1; count <= _size; count++) {
      const listOfValue: string[] = this.filledWithValue(count, _size);
      pattern.push([...listOfValue]);
    }
    return pattern;
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
        if (letter !== this.spaceValue) mergedLetter[letterIndex] = letter;
      });
      mergedPattern.push(mergedLetter);
    });
    return mergedPattern;
  };

  interpretPattern(pattern: PatternDto): any[] {
    if (pattern.letter === 'x' || pattern.letter === 'X') {
      const forwardSlant: any[] = this.createForwardSlant(pattern.size);
      const backwardSlant: any[] = this.createBackwardSlant(pattern.size);
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
