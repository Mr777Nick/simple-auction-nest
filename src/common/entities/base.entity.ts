import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { DatabaseValue } from '../constants/database-value.constant';

@Entity()
export class Base {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Exclude()
  @CreateDateColumn()
  createdAt: Date;

  @Exclude()
  @Column({ nullable: false, default: DatabaseValue.SYSTEM })
  createdBy: string;

  @Exclude()
  @UpdateDateColumn()
  updatedAt: Date;

  @Exclude()
  @Column({ nullable: true })
  updatedBy: string;

  @Exclude()
  @DeleteDateColumn()
  deletedAt: Date;

  @Exclude()
  @Column({ nullable: true })
  deletedBy: string;
}
