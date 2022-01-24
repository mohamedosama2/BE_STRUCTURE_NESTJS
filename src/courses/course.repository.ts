import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  FilterQuery,
  Model,
  PaginateModel,
  PaginateOptions,
  PaginateResult,
} from 'mongoose';
import { BaseAbstractRepository } from 'src/utils/base.abstract.repository';
import { Course, CourseDocument } from './models/course.model';
import * as _ from 'lodash';

@Injectable()
export class CourseRepository extends BaseAbstractRepository<Course> {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
  ) {
    super(courseModel);
  }

  public async findAllWithPaginationOption(
    queryFiltersAndOptions: any,
    arrayOfFilters: string[],
    extraOptions: PaginateOptions = {},
  ): Promise<PaginateResult<CourseDocument> | CourseDocument[]> {
    const filters: FilterQuery<CourseDocument> = _.pick(
      queryFiltersAndOptions,
      arrayOfFilters,
    );
    filters['class'] && (filters['class.id'] = filters['class']);
    delete filters['class'];
    filters['teacher'] && (filters['teacher.id'] = filters['teacher']);
    delete filters['teacher'];
    // console.log(filters);
    const options: PaginateOptions = _.pick(queryFiltersAndOptions, [
      'page',
      'limit',
    ]);
    let docs;
    if (queryFiltersAndOptions.allowPagination) {
      docs = await (this.courseModel as PaginateModel<CourseDocument>).paginate(
        filters,
        { ...options, ...extraOptions },
      );
    } else {
      docs = await this.courseModel.find(filters).setOptions(options);
    }
    return docs;
  }
}
