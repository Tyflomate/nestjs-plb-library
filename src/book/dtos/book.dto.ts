import {
  IsNotEmpty,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class BookDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  editor: string;

  @IsNotEmpty()
  @IsPositive()
  year: number;

  @IsNotEmpty()
  author;
}
