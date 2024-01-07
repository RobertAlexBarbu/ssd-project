import { Injectable } from '@nestjs/common';
import { App, applicationDefault, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

@Injectable()
export class FirebaseService {
  private firebaseApp: App;
  constructor() {
    this.firebaseApp = initializeApp({
      credential: applicationDefault(),
    });
  }
  getAuth() {
    return getAuth(this.firebaseApp);
  }
}
