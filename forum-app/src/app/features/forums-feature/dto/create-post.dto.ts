export interface CreatePostDto {
  categoryId: number | null;
  forumId: number;
  title: string;
  content: string;
}
