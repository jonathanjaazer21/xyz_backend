import { IsEnum, IsInt, IsNotEmpty, IsOptional, Min } from 'class-validator';

export enum Direction {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
}

export class EntriesDto {
  @IsNotEmpty({ message: 'Letters must be x, y, z value only' })
  readonly letters: string;

  @IsInt()
  @Min(3)
  readonly size: number;

  @IsNotEmpty()
  @IsEnum(Direction, {
    message: 'Input must be "horizontal" and "vertical" value only',
  })
  readonly direction: Direction;
}
