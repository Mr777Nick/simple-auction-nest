import { Column, Entity, ManyToOne } from 'typeorm';

import { Base } from '../../../common/entity/base.entity';
import { User } from '../../users/entity/user.entity';

@Entity({ name: 'internalTransactions' })
export class InternalTransaction extends Base {
  @ManyToOne(() => User, (user) => user.internalTransactions, {
    nullable: false,
  })
  user: User;

  @Column({ nullable: false })
  type: string;

  @Column({ nullable: false })
  amount: number;

  @Column({ nullable: false })
  status: string;
}
