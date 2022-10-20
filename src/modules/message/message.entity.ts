import { IsEmail } from 'class-validator';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity()
export class MessageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  senderEmail: string;

  @Column()
  receiverEmail: string;

  @Column()
  title: string;

  @Column()
  body: string;

  @ManyToOne((type) => UserEntity, (user) => user.messages) user: UserEntity;
}
