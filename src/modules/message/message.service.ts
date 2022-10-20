import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { MessageDTO } from './message.dto';
import { MessageEntity } from './message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private messageRepository: Repository<MessageEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getAllMessages(): Promise<MessageEntity[]> {
    return await this.messageRepository.find();
  }

  async getMessageOfUser(email: string): Promise<MessageEntity[]> {
    return await this.messageRepository.find({
      where: { receiverEmail: email },
    });
  }

  async sendMessage(message: MessageDTO): Promise<MessageEntity> {
    const senderExist = await this.userRepository.findOne({
      where: {
        email: message.senderEmail,
      },
    });

    if (!senderExist) throw new NotFoundException('sender email not registred');

    const receiverExist = await this.userRepository.findOne({
      where: {
        email: message.receiverEmail,
      },
    });

    if (!receiverExist)
      throw new NotFoundException('receiver email not registred');

    return await this.messageRepository.save(message);
  }
}
