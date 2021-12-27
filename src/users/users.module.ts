import {
  forwardRef,
  Module,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserRole, UserSchema } from './models/_user.model';
import { Student, StudentSchema } from './models/student.model';
import { Teacher, TeacherSchema } from './models/teacher.model';
import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { UploadCloudinary } from 'src/utils/services/upload-cloudinary';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MessageQueueModule } from 'src/message-queue/message-queue-publisher.module';
import { MessageQueueService } from 'src/message-queue/message-queue.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
        discriminators: [
          { name: UserRole.STUDENT, schema: StudentSchema },
          { name: UserRole.TEACHER, schema: TeacherSchema },
        ],
      },
    ]),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useClass: UploadCloudinary,
      inject: [ConfigService],
    }),
    forwardRef(() => MessageQueueModule),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
