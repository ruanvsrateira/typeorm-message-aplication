import { IsEmail, IsString } from 'class-validator';

export class MessageDTO {
  id?: string;

  @IsString()
  title: string;

  @IsString()
  body: string;

  @IsEmail()
  senderEmail: string;

  @IsEmail()
  receiverEmail: string;
}
