import { UserModel } from '../../../core/models/user.model';
import { PostModel } from '../../forums-feature/models/post.model';

export interface ProfileModel {
  user: UserModel;
  posts: PostModel[];
}
