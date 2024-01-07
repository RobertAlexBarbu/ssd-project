import { inject, Injectable } from '@angular/core';
import { HttpService } from '../../../../core/services/http/http.service';
import { UserModel } from '../../../../core/models/user.model';
import { UpdateToAdminDto } from '../../dto/update-to-admin.dto';

@Injectable()
export class AdminService {
  http = inject(HttpService);

  findAdmins() {
    return this.http.get<UserModel[]>('users/admins');
  }

  updateToAdmin(updateToAdminDto: UpdateToAdminDto) {
    return this.http.post<UserModel, UpdateToAdminDto>(
      'users/admins',
      updateToAdminDto
    );
  }

  demoteAdmin(id: string) {
    return this.http.putByID<UserModel>('users/admins', {}, id);
  }
}
