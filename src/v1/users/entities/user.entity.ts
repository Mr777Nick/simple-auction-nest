import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany } from 'typeorm';

import { Base } from '../../../common/entities/base.entity';
import { InternalTransaction } from '../../internal-transactions/entities/internal-transaction.entity';
import { Item } from '../../items/entities/item.entity';

@Entity({ name: 'users' })
export class User extends Base {
  @Exclude()
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, default: 0, type: 'float' })
  balance: number;

  @OneToMany(
    () => InternalTransaction,
    (internalTransaction) => internalTransaction.user,
  )
  internalTransactions: InternalTransaction[];

  @OneToMany(() => Item, (item) => item.user)
  items: InternalTransaction[];
}
