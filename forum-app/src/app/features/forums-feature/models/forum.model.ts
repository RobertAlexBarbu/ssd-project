import { PostModel } from './post.model';
import { CategoryModel } from './category.model';

export interface ForumModel {
  id: number;
  name: string;
  categories: CategoryModel[];
  posts: PostModel[];
}
