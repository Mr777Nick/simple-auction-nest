import { Column, Entity, OneToMany } from 'typeorm';

import { Base } from '../../../common/entity/base.entity';
import { InternalTransaction } from '../../internal-transactions/entity/internal-transactions.entity';

@Entity({ name: 'users' })
export class User extends Base {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, default: 0 })
  balance: number;

  @OneToMany(
    () => InternalTransaction,
    (internalTransaction) => internalTransaction.user,
  )
  internalTransactions: InternalTransaction[];
}
