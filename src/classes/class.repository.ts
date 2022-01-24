import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseAbstractRepository } from 'src/utils/base.abstract.repository';
import { Class, ClassDocument } from './models/class.model';

@Injectable()
export class ClassRepository extends BaseAbstractRepository<Class> {
  constructor(
    @InjectModel(Class.name) private classModel: Model<ClassDocument>,
  ) {
    super(classModel);
  }
}
