import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Forum } from './Forum';
import { Post } from '../../posts/entities/Post';

@Entity()
export class Category {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @ManyToOne()
  forum?: Forum;

  @OneToMany(() => Post, (post) => post.category)
  posts? = new Collection<Post>(this);
}
