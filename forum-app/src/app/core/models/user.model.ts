import { RoleModel } from './role.model';
export interface UserModel {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  role: RoleModel;
}
