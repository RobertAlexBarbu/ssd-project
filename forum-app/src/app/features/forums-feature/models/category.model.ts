import { PostModel } from './post.model';
import { ForumModel } from './forum.model';

export interface CategoryModel {
  id: number;
  name: string;
  forum?: ForumModel;
  posts?: PostModel[];
}
