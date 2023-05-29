import { Column, Entity, ManyToOne } from 'typeorm';

import { Base } from '../../../common/entities/base.entity';
import { Item } from '../../items/entities/item.entity';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'itemBids' })
export class ItemBid extends Base {
  @ManyToOne(() => User, (user) => user.itemBids, {
    nullable: false,
  })
  user: User;

  @ManyToOne(() => Item, (item) => item.itemBids, {
    nullable: false,
  })
  item: Item;

  @Column({ nullable: false, type: 'float' })
  price: number;
}
