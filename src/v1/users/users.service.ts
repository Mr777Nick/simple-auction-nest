import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DatabaseValue } from '../../common/constant/database-value.constant';
import {
  InternalTransactionStatus,
  InternalTransactionType,
} from '../internal-transactions/enum/internal-transactions.enum';
import { InternalTransactionsService } from '../internal-transactions/internal-transactions.service';

import { User } from './entity/user.entity';
import { ICreateUser } from './interface/create-user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private internalTransactionsService: InternalTransactionsService,
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

  async findOne(id: string) {
    try {
      const user = await this.usersRepository.findOneBy({ id });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async updateOne(id: string, updateUser: Partial<ICreateUser>) {
    try {
      const user = await this.usersRepository.findOneBy({ id });

      if (!user) throw 'User not found';

      const updatedUser = this.usersRepository.merge(user, updateUser);
      await this.usersRepository.save(updatedUser);
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  async topUpBalance(userId: string, amount: number) {
    try {
      const user = await this.findOne(userId);

      if (!user) throw 'User not found';

      const updatedUser = this.usersRepository.merge(user, {
        balance: user.balance + amount,
      });

      await this.usersRepository.save(updatedUser);

      await this.internalTransactionsService.createOne({
        userId,
        type: InternalTransactionType.DEPOSIT,
        amount,
        status: InternalTransactionStatus.COMPLETED,
      });

      return updatedUser;
    } catch (error) {
      throw error;
    }
  }
}
