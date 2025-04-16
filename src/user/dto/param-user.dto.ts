import { IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class UserParamDto {
  @IsOptional()
  @Type(() => Number) // преобразует string в number
  @IsInt()
  @Min(1)
  id: number;
}
