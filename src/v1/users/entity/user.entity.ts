import { Column, Entity } from 'typeorm';

import { Base } from '../../../common/entity/base.entity';

@Entity({ name: 'users' })
export class User extends Base {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, default: 0 })
  balance: number;
}
