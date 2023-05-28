import { Column, Entity, ManyToOne } from 'typeorm';

import { Base } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'internalTransactions' })
export class InternalTransaction extends Base {
  @ManyToOne(() => User, (user) => user.internalTransactions, {
    nullable: false,
  })
  user: User;

  @Column({ nullable: false })
  type: string;

  @Column({ nullable: false, type: 'float' })
  amount: number;

  @Column({ nullable: false })
  status: string;
}
