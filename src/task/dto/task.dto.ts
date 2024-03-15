import { ApiProperty } from '@nestjs/swagger';
import {
  IsIn,
  IsNotEmpty,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';

export class TaskDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(6, {
    message: 'Le titre doit avoir au moins 6 caractères',
  })
  title: string;

  @IsNotEmpty()
  @Min(2000)
  @Max(2030)
  year: number;

  @IsIn(['todo', 'in progress'])
  status: string;
}
