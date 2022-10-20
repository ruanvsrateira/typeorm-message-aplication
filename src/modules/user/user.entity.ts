import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { MessageEntity } from '../message/message.entity';

@Entity()
export class UserEntity {
  @Column()
  name: string;

  @PrimaryColumn({ unique: true })
  email: string;

  @Column()
  lastName: string;

  @OneToMany((type) => MessageEntity, (message) => message.user)
  messages: MessageEntity[];
}
