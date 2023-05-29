import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { Base } from '../../../common/entities/base.entity';
import { ItemBid } from '../../item-bids/entities/item-bid.entity';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'items' })
export class Item extends Base {
  @ManyToOne(() => User, (user) => user.items, {
    nullable: false,
  })
  user: User;

  @Column({ nullable: false })
  status: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, type: 'float' })
  startPrice: number;

  @Column({ nullable: false })
  endedAt: Date;

  @Column({ nullable: true, type: 'float' })
  soldPrice: number;

  @OneToMany(() => ItemBid, (itemBid) => itemBid.item)
  itemBids: ItemBid[];
}
