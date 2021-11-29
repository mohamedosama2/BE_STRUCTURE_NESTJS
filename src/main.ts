import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './utils/filters/http-exception.filter';
import * as helmet from 'helmet';
import * as logger from 'morgan';
import { Transport } from '@nestjs/microservices';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(logger('dev'));
  app.enableCors();
  app.use(helmet());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.useGlobalFilters(new AllExceptionsFilter());
  // Then combine it with a RabbitMQ microservice
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [
        `amqps://zcfvyzvh:cKIn4m4ZbwR-Y0lmhAfOFcmlnksvzed5@fox.rmq.cloudamqp.com/zcfvyzvh`,
      ],
      queue: 'nestjs',
      queueOptions: { durable: false },
    },
  });

  // this is related to consumers
  // app.connectMicroservice({
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: [
  //       `amqps://zcfvyzvh:cKIn4m4ZbwR-Y0lmhAfOFcmlnksvzed5@fox.rmq.cloudamqp.com/zcfvyzvh`,
  //     ],
  //     queue: 'nestjs-2',
  //     queueOptions: { durable: false },
  //   },
  // });

  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
