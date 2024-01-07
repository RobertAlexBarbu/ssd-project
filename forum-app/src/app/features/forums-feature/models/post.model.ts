import { UserModel } from '../../../core/models/user.model';
import { ForumModel } from './forum.model';
import { PostLike } from './post-like.model';
import { CommentModel } from './comment.model';
import { CategoryModel } from './category.model';

export interface PostModel {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  category: CategoryModel | null;
  user: UserModel;
  forum: ForumModel;
  postLikes: PostLike[];
  comments: CommentModel[];
}
