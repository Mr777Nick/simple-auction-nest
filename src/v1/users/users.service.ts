import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DatabaseValue } from '../../common/constant/database-value.constant';

import { User } from './entity/user.entity';
import { ICreateUser } from './interface/create-user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createOne(createUser: ICreateUser) {
    try {
      const user = this.usersRepository.create({
        ...createUser,
        createdBy: DatabaseValue.SYSTEM,
      });

      await this.usersRepository.save(user);
      return user;
    } catch (error) {
      throw error;
    }
  }
}
