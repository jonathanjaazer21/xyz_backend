import { Injectable } from '@nestjs/common';

@Injectable()
export class PatternCommands {
  spaceValue = ' ';
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

  createForwardSlant(_size: number) {
    const pattern: any[] = [];
    // line forward pattern
    for (let count = 1; count <= _size; count++) {
      const listOfValue: string[] = this.filledWithValue(count, _size);
      pattern.push([...listOfValue]);
    }
    return pattern;
  }

  createBackwardSlant(_size: number) {
    const pattern: any[] = [];
    // line forward pattern
    for (let count = _size; count >= 1; count--) {
      const listOfValue: string[] = this.filledWithValue(count, _size);
      pattern.push([...listOfValue]);
    }
    return pattern;
  }
}
