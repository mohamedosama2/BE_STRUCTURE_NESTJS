import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import * as amqp from 'amqp-connection-manager';
import { Channel } from 'amqplib';
import { Constants } from '../utils/constants';
// import { RecieverOperationMessage } from './IMessageQueueService';

@Injectable()
export class ConsumerService implements OnApplicationBootstrap {
  async onApplicationBootstrap(): Promise<void> {
    this.testConsumer();
  }

  // consume messages from RabbitMQ
  async testConsumer(): Promise<void> {
    let connection: amqp.AmqpConnectionManager = await amqp.connect(
      process.env.AMQP_URL,
    );
    let channel: amqp.ChannelWrapper = await connection.createChannel({
      setup: function (channel: Channel) {
        return Promise.all([channel.prefetch(2)]);
      },
    });
    connection.on('connect', function () {
      console.log(
        '\x1b[32m%s\x1b[0m',
        '[!] AMQP Connected from test consumer: ',
        process.env.AMQP_URL,
      );
    });
    return new Promise((resolve, reject) => {
      channel.consume(Constants.MessageQueues.TEST, async function (msg) {
        // parse message
        let msgBody = msg.content.toString();
        let data = JSON.parse(msgBody);
        try {
          console.log(data);
          await channel.ack(msg);
        } catch (err) {
          console.log(err);
          await channel.ack(msg);
        }
      });
    });
  }
}
