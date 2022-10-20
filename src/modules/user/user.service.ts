import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDTO } from './user.dto';
import { UserEntity } from './user.entity';

Injectable();
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private repository: Repository<UserEntity>,
  ) {}

  async getAllUsers(): Promise<UserEntity[]> {
    return await this.repository.find();
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.repository.findOne({ where: { email } });

    if (!user) throw new NotFoundException('Email not registred!');

    return user;
  }

  async createUser(user: UserDTO): Promise<UserEntity> {
    const userExist = await this.repository.findOne({
      where: {
        email: user.email,
      },
    });

    if (userExist) throw new BadRequestException('email already registred');

    return await this.repository.save(user);
  }

  async deleteUserByEmail(email: string): Promise<UserEntity> {
    const userExist = await this.repository.findOne({ where: { email } });

    if (!userExist)
      throw new NotFoundException('User not founded by this email');

    await this.repository.delete(email);

    return userExist;
  }

  async updateUserByEmail(email: string, user: UserDTO): Promise<UserEntity> {
    const userExist = await this.repository.findOne({ where: { email } });

    if (!userExist)
      throw new NotFoundException('User not founded by this email');

    await this.repository.update(email, user);

    return await this.repository.findOne({ where: { email } });
  }
}
