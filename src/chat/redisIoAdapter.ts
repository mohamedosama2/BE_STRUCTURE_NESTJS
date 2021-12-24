import { IoAdapter } from '@nestjs/platform-socket.io';
import { RedisClient } from 'redis';
import { ServerOptions } from 'socket.io';
import { createAdapter } from 'socket.io-redis';

const pubClient = new RedisClient({
  host: 'redis-18251.c245.us-east-1-3.ec2.cloud.redislabs.com',
  port: 18251,
  no_ready_check: true,
  auth_pass: 'YG6rxVosxgFrPJQid35mFh9zNKhdazf5',
});
const subClient = pubClient.duplicate();
const redisAdapter = createAdapter({ pubClient, subClient });

export class RedisIoAdapter extends IoAdapter {
  createIOServer(port: number, options?: ServerOptions): any {
    const server = super.createIOServer(port, options);
    server.adapter(redisAdapter);
    return server;
  }
}
