import * as amqp from 'amqp-connection-manager';
import { Channel } from 'amqplib';
import { Constants } from '../utils/constants';
import * as mongoose from 'mongoose';
// consume messages from RabbitMQ
async function testConsumer(): Promise<void> {
  const connection: amqp.AmqpConnectionManager = await amqp.connect(
    'amqps://kmuergjm:Q3oBdA_iX3triTcv_2YopwdL4AtHkz8D@jaguar.rmq.cloudamqp.com/kmuergjm',
  );
  const channel: amqp.ChannelWrapper = await connection.createChannel({
    setup: function (channel: Channel) {
      return Promise.all([channel.prefetch(2)]);
    },
  });
  connection.on('connect', function () {
    console.log(
      '\x1b[32m%s\x1b[0m',
      '[!] AMQP Connected from test consumer: ',
      'amqps://kmuergjm:Q3oBdA_iX3triTcv_2YopwdL4AtHkz8D@jaguar.rmq.cloudamqp.com/kmuergjm',
    );
  });
  return new Promise((resolve, reject) => {
    channel.consume(Constants.MessageQueues.TEST, async function (msg) {
      // parse message
      const msgBody = msg.content.toString();
      const data = JSON.parse(msgBody);
      console.log('test');
      try {
        const promises = [];
        for (let i = 0; i < 100000; i++) {
          promises.push(
            new Promise(function (resolve, reject) {
              if (1) {
                for (let i = 0; i < 100000; i++) {
                  for (let j = 0; j < 100000; j++) {}
                }
                resolve('Stuff worked!');
              }
            }),
          );
        }
        await Promise.all(promises);
        console.log('finish');
        await channel.ack(msg);
      } catch (err) {
        console.log('err');
        await channel.ack(msg);
      }
    });
  });
}

testConsumer();
