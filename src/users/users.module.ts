import { Module, UnprocessableEntityException } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserRole, UserSchema } from './models/_user.model';
import { StudentSchema } from './models/student.model';
import { TeacherSchema } from './models/teacher.model';
import { MulterModule } from '@nestjs/platform-express';
import { UploadCloudinary } from 'src/utils/services/upload-cloudinary';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Transport, ClientsModule } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NESTJS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [
            'amqps://zcfvyzvh:cKIn4m4ZbwR-Y0lmhAfOFcmlnksvzed5@fox.rmq.cloudamqp.com/zcfvyzvh',
          ],
          queue: 'nestjs',
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: 'NESTJS_SERVICE_2',
        transport: Transport.RMQ,
        options: {
          urls: [
            'amqps://zcfvyzvh:cKIn4m4ZbwR-Y0lmhAfOFcmlnksvzed5@fox.rmq.cloudamqp.com/zcfvyzvh',
          ],
          queue: 'nestjs-2',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
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
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
