import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MessageDTO } from './message.dto';
import { MessageEntity } from './message.entity';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Get()
  async getAllMessages(): Promise<MessageEntity[]> {
    return await this.messageService.getAllMessages();
  }

  @Get(':email')
  async getMessageOfUser(@Param('email') email: string) {
    return await this.messageService.getMessageOfUser(email);
  }

  @Post()
  async sendMessage(@Body() message: MessageDTO): Promise<MessageEntity> {
    return this.messageService.sendMessage(message);
  }
}
