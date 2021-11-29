import { Controller, UseFilters } from '@nestjs/common';
import { ConsumersService } from './consumers.service';
import { EventPattern } from '@nestjs/microservices';
import { RpcExceptionFilter } from './rpc-exception.filter';

@Controller()
export class ConsumersController {
  constructor(private readonly consumersService: ConsumersService) {}

  @UseFilters(new RpcExceptionFilter())
  @EventPattern('nestjs_message')
  async handleMessagePrinted(data: Record<string, unknown>) {
    console.log('1111111111', data);
  }

  @EventPattern('nestjs_message')
  async handleMessagePrinted2(data: Record<string, unknown>) {
    console.log('2222222222', data);
  }


  // @EventPattern('nestjs_message_2')
  // async handleMessagePrinted3(data: Record<string, unknown>) {
  //   console.log('33333333333333333', data);
  // }
}
