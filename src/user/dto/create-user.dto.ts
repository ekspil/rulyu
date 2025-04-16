import { IsInt, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(2, 50)
  full_name: string;
  @IsString()
  @Length(2, 50)
  role: string;
  @IsInt()
  efficiency: number;
}
