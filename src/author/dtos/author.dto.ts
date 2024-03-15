import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class AuthorDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  lastName: string;
}
