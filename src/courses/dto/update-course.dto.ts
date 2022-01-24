import { PickType } from '@nestjs/swagger';
import { CreateCourseDto } from './create-course.dto';

export class UpdateCourseDto extends PickType(CreateCourseDto, [
  'names',
] as const) {}
