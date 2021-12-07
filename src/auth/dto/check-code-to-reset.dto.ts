import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, Matches, Max } from 'class-validator';
import { FilterUserDto } from 'src/users/dto/filter-user.dto';
import { UserRole } from 'src/users/models/_user.model';
import { Constants } from 'src/utils/constants';
import { LoginDto } from './login.dto';
type Pet = FilterUserDto | LoginDto;
export class CheckCodeToResetDto {
  @IsString()
  @Matches(Constants.PHONE_REGX, { message: 'phone is invalid' })
  phone: string;

  @IsString()
  @IsNotEmpty()
  // @Max(10)
  code: UserRole;

  test: LoginDto;

  test2: FilterUserDto;

  @ApiProperty({
    type: 'array',
    items: {
      anyOf: [
        { $ref: getSchemaPath(FilterUserDto) },
        { $ref: getSchemaPath(LoginDto) },
      ],
    },
  })
  test3: Pet[];
}
