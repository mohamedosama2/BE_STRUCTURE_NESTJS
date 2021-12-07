import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsMongoId, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsBoolean()
  @IsOptional()
  enabled?: boolean;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: 'string', format: 'binary' })
  photo?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  photos?:string[]
}
