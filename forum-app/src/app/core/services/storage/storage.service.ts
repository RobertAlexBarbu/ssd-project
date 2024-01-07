import { inject, Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  af = inject(AngularFireStorage);

  uploadFile(path: string, fileName: string, file: File) {
    return this.af.upload(`${path}/${fileName}`, file);
  }

  getDownloadFileURL(path: string, fileName: string): Observable<string> {
    const ref = this.af.ref(`${path}/${fileName}`);
    return ref.getDownloadURL();
  }

  getFileReference(path: string, fileName: string) {
    return this.af.ref(`${path}/${fileName}`);
  }
}
