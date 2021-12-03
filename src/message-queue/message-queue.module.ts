import { Module } from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import { MessageQueueService } from './message-queue.service';

@Module({
  providers: [MessageQueueService, ConsumerService],
  exports: [MessageQueueService],
})
export class MessageQueueModule {}
