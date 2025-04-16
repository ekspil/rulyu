import { IsOptional, IsInt, Min, IsString, Length } from 'class-validator';
import { Type } from 'class-transformer';

export class UserQueryDto {
  @IsOptional()
  @IsString()
  @Length(2, 50)
  full_name?: string;

  @IsOptional()
  @IsString()
  @Length(2, 50)
  role?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  efficiency?: number;
}
