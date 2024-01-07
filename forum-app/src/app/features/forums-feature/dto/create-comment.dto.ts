export interface CreateCommentDto {
  postId: number;
  content: string;
  username: string;
  userEmail: string;
  postName: string;
}
