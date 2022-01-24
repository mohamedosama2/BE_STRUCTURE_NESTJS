import { Type } from "class-transformer";
import { IsMongoId, ValidateNested } from "class-validator";
import { IsNonPrimitiveArray } from "src/utils/customValidationDecorator";
import { addNameDto } from "./add-names.dto";

export class CreateCourseDto {
  @IsMongoId()
  classId: string;

  @IsMongoId()
  teacher: string;

  @ValidateNested({ each: true })
  @IsNonPrimitiveArray()
  @Type(() => addNameDto)
  names: addNameDto[];
}
