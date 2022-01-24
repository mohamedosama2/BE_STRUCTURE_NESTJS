import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { IsNonPrimitiveArray } from 'src/utils/customValidationDecorator';
import { addNameDto } from './add-names.dto';

export class CreateClassDto {
  @ValidateNested({ each: true })
  @IsNonPrimitiveArray()
  @Type(() => addNameDto)
  names: addNameDto[];
}
