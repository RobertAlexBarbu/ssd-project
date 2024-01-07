import { UserModel } from '../../../core/models/user.model';
import { PostModel } from './post.model';

export interface CommentModel {
  id: number;
  content: string;
  createdAt: string;
  user: UserModel;
  post: PostModel;
}
