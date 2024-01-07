import { UserModel } from '../../../core/models/user.model';
import { PostModel } from './post.model';

export interface PostLike {
  id: number;
  user: UserModel;
  post: PostModel;
}
