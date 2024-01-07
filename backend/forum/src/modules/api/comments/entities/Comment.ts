import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Post } from '../../posts/entities/Post';
import { User } from '../../users/entities/User';

@Entity()
export class Comment {
  @PrimaryKey()
  id!: number;

  @ManyToOne({ entity: () => User, onDelete: 'set null', nullable: true })
  user?: User;

  @Property({ length: 256 })
  content!: string;

  @ManyToOne({ entity: () => Post, onDelete: 'cascade', nullable: true })
  post?: Post;

  @Property()
  createdAt?: Date = new Date();
}
