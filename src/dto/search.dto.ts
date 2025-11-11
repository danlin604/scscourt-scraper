import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class SearchDto {
  @IsString()
  @IsNotEmpty({ message: 'First name is required' })
  @MinLength(2, { message: 'First name must be at least 2 characters' }) // Validated limit
  @MaxLength(256, { message: 'First name must not exceed 256 characters' })
  firstName: string;

  @IsString()
  @IsNotEmpty({ message: 'Last name is required' })
  @MinLength(2, { message: 'Last name must be at least 2 characters' }) // Validated limit
  @MaxLength(256, { message: 'Last name must not exceed 256 characters' })
  lastName: string;
}