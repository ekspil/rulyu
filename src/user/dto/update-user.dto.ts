import { IsInt, IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Length(2, 50)
  full_name?: string;
  @IsOptional()
  @IsString()
  @Length(2, 50)
  role?: string;
  @IsOptional()
  @IsInt()
  efficiency?: number;
}
