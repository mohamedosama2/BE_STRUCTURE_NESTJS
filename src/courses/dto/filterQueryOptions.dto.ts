import { isMongoId, IsMongoId, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { escapeRegExp } from 'lodash';
import { PaginationParams } from 'src/utils/pagination/paginationParams.dto';
import { IntersectionType } from '@nestjs/swagger';

export class FilterQueryCourse {
  @IsOptional()
  @IsMongoId()
  teacher?: string;

  @IsOptional()
  @IsMongoId()
  class?: string;
}

export class FilterQueryOptionsCourse extends IntersectionType(
  FilterQueryCourse,
  PaginationParams,
) {}
