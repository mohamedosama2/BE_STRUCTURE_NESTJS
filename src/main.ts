import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './utils/filters/http-exception.filter';
import * as helmet from 'helmet';
import * as logger from 'morgan';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { PaginationParams } from './utils/pagination/paginationParams.dto';
import { PaginatedDto } from './utils/pagination/paginated.dto';
import { User } from './users/models/_user.model';
import { Student } from './users/models/student.model';
import { Teacher } from './users/models/teacher.model';
import { FilterQueryOptionsUser } from './users/dto/filterQueryOptions.dto';
import ParamsOrQueryWithId from './utils/paramsOrQueryWithId.dto';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        port: 8001,
      },
    },
  );
  app.listen();
}
bootstrap();
