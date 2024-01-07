import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Category } from './Category';
import { Post } from '../../posts/entities/Post';

@Entity()
export class Forum {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @OneToMany(() => Category, (category) => category.forum)
  categories? = new Collection<Category>(this);

  @OneToMany({
    entity: () => Post,
    mappedBy: (post) => post.forum,
    orderBy: { createdAt: 'desc' },
  })
  posts? = new Collection<Post>(this);
}
