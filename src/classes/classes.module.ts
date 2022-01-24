import { Module } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { ClassesController } from './classes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Class, ClassSchema } from './models/class.model';
import { ClassRepository } from './class.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Class.name,
        schema: ClassSchema,
      },
    ]),
  ],
  controllers: [ClassesController],
  providers: [ClassesService, ClassRepository],
  exports: [ClassesService, ClassRepository],
})
export class ClassesModule {}
