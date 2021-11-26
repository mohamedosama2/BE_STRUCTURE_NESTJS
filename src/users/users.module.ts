import { Module, UnprocessableEntityException } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/_user.entity';
import { Student, StudentSchema } from './entities/student.entity';
import { Teacher, TeacherSchema } from './entities/teacher.entity';
import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { UploadCloudinary } from 'src/utils/services/upload-cloudinary';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Post, PostSchema } from './entities/post.entity';
import { Category, CategorySchema } from './entities/category.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
        discriminators: [
          { name: Student.name, schema: StudentSchema },
          { name: Teacher.name, schema: TeacherSchema },
        ],
      },
      {
        name: Post.name,
        schema: PostSchema,
      },
      {
        name: Category.name,
        schema: CategorySchema,
      },
    ]),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useClass: UploadCloudinary,
      inject: [ConfigService],
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
