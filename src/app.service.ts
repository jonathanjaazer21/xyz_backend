import { ForbiddenException, Injectable } from '@nestjs/common';
import { EntriesDto, Direction } from './dto/entries.dto';
import { PatternXService } from './pattern/patternx.service';
import { PatternYService } from './pattern/patterny.service';
import { PatternZService } from './pattern/patternz.service';

@Injectable()
export class AppService {
  constructor(
    private patternXService: PatternXService,
    private patternYService: PatternYService,
    private patternZService: PatternZService,
  ) {}

  private isOdd(size: number): boolean {
    return size % 2 ? true : false;
  }

  private convertLettersToArray(letters: string): string[] {
    const arrayLetters: string[] = [];
    if (letters) {
      for (let index = 0; index < letters.length; index++) {
        arrayLetters.push(letters[index]);
      }
    }
    return arrayLetters;
  }

  private handleLetters(letters: string): boolean {
    // remove the letters not included in the list
    const _allowedLetters: string[] = ['X', 'Y', 'Z', 'x', 'y', 'z'];
    for (let index = 0; index < letters.length; index++) {
      if (!_allowedLetters.includes(letters[index])) {
        return false;
      }
    }
    return true;
  }

  private handleLettersToPattern(entries: EntriesDto): any[] {
    const patternOfLetters: any[] = [];
    const arrayOfLetters: string[] = this.convertLettersToArray(
      entries.letters,
    );
    arrayOfLetters.forEach((letter: string) => {
      // x pattern
      const xPattern = this.patternXService.interpretPattern({
        size: entries.size,
        letter,
      });
      // y pattern
      const yPattern = this.patternYService.interpretPattern({
        size: entries.size,
        letter,
      });

      // z pattern
      const zPattern = this.patternZService.interpretPattern({
        size: entries.size,
        letter,
      });

      if (xPattern.length > 0) {
        patternOfLetters.push(xPattern);
      }
      if (yPattern.length > 0) {
        patternOfLetters.push(yPattern);
      }
      if (zPattern.length > 0) {
        patternOfLetters.push(zPattern);
      }
    });
    return patternOfLetters;
  }

  private handleDirection(patterns: any[], direction: string): any[] {
    const patternDirection: any[] = [];
    if (direction === Direction.VERTICAL) {
      patterns.forEach((letterPattern: any[]) => {
        letterPattern.forEach((patternRow: any[]) => {
          patternDirection.push(patternRow);
        });
        patternDirection.push([]);
      });
    } else {
      const space = [' '];
      patterns.forEach((letterPattern: any[]) => {
        letterPattern.forEach((patternRow: any[], index: number) => {
          if (patternDirection[index] === undefined) {
            patternDirection.push(patternRow);
          } else {
            patternDirection[index] = [
              ...patternDirection[index],
              ...space,
              ...patternRow,
            ];
          }
        });
      });
    }
    return patternDirection;
  }

  interpretPattern(entries: EntriesDto): any {
    if (!this.isOdd(entries.size)) {
      throw new ForbiddenException(['Size must be odd number']);
    }
    if (!this.handleLetters(entries.letters)) {
      throw new ForbiddenException(['Letters must be x, y, z value only']);
    }

    const patterns: any[] = this.handleLettersToPattern(entries);
    const patternWithDirection = this.handleDirection(
      patterns,
      entries.direction,
    );

    return patternWithDirection;
  }
}
