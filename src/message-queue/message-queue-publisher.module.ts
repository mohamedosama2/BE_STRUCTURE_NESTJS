import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/database.module';
import { UsersModule } from 'src/users/users.module';
import { MessageQueueService } from './message-queue.service';

@Module({
  providers: [MessageQueueService],
  exports: [MessageQueueService],
})
export class MessageQueueModule {}
