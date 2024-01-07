import { Entity, ManyToOne, PrimaryKey } from '@mikro-orm/core';
import { Post } from './Post';
import { User } from '../../users/entities/User';

@Entity()
export class PostLike {
  @PrimaryKey()
  id!: number;

  @ManyToOne({ entity: () => User, onDelete: 'cascade', nullable: true })
  user?: User;

  @ManyToOne({ entity: () => Post, onDelete: 'cascade', nullable: true })
  post?: Post;
}
