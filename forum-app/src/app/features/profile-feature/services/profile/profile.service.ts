import { inject, Injectable } from '@angular/core';
import { HttpService } from '../../../../core/services/http/http.service';
import { ProfileModel } from '../../models/profile.model';
import { StorageService } from '../../../../core/services/storage/storage.service';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  http = inject(HttpService);

  storage = inject(StorageService);

  getProfile(username: string) {
    return this.http.getByID<ProfileModel>('profile', username);
  }

  uploadProfilePicture(file: File, name: string) {
    return this.storage.uploadFile(
      `profile/users/${name}`,
      'profile.jpg',
      file
    );
  }

  getProfilePictureURL(name: string) {
    return this.storage
      .getDownloadFileURL(`profile/users/${name}`, 'profile.jpg')
      .pipe(
        catchError(() => {
          return this.storage
            .getFileReference('profile', 'default.webp')
            .getDownloadURL();
        })
      );
  }
}
