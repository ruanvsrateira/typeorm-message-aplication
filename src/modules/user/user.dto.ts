import { IsEmail, IsString } from 'class-validator';

export class UserDTO {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  lastName: string;
}
