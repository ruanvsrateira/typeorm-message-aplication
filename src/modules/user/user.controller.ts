import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserDTO } from './user.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<UserEntity[]> {
    return this.userService.getAllUsers();
  }

  @Get(':email')
  async getUserByEmail(@Param('email') email: string): Promise<UserEntity> {
    return this.userService.getUserByEmail(email);
  }

  @Post()
  async createNewUser(@Body() user: UserDTO): Promise<UserEntity> {
    return this.userService.createUser(user);
  }

  @Delete(':email')
  async deleteUserByEmail(@Param('email') email: string): Promise<UserEntity> {
    return this.userService.deleteUserByEmail(email);
  }

  @Patch(':email')
  async updateUserByEmail(
    @Param('email') email: string,
    @Body() data: UserDTO,
  ): Promise<UserEntity> {
    return this.userService.updateUserByEmail(email, data);
  }
}
