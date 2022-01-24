import { IsString } from 'class-validator';

export class addNameDto {
  @IsString()
  lang: string;

  @IsString()
  value: string;
}
