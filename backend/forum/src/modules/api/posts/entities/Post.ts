import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Category } from '../../forums/entities/Category';
import { Forum } from '../../forums/entities/Forum';
import { User } from '../../users/entities/User';
import { PostLike } from './PostLike';
import { Comment } from '../../comments/entities/Comment';

@Entity()
export class Post {
  @PrimaryKey()
  id!: number;

  @Property({ length: 32 })
  title!: string;

  @Property()
  content!: string;

  @Property()
  createdAt?: Date = new Date();

  @ManyToOne({ entity: () => Category, onDelete: 'set null', nullable: true })
  category?: Category;

  @ManyToOne({ entity: () => User, onDelete: 'set null', nullable: true })
  user?: User;

  @ManyToOne({ entity: () => Forum, onDelete: 'cascade', nullable: true })
  forum?: Forum;

  @OneToMany(() => PostLike, (postLike) => postLike.post)
  postLikes? = new Collection<PostLike>(this);

  @OneToMany(() => Comment, (comment) => comment.post)
  comments? = new Collection<Comment>(this);
}
