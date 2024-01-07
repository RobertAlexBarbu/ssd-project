export interface UpdateForumDto {
  name: string;
  deletedCategories: { id: number; name: string }[];
  addedCategories: { name: string }[];
}
