import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebaseAuthDto } from '../../../features/auth-feature/dto/firebase-auth.dto';
import { catchError, from, switchMap, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import firebase from 'firebase/compat/app';
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;
import AuthProvider = firebase.auth.AuthProvider;
import { ErrorService } from '../error/error.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  errorService = inject(ErrorService);

  authService = inject(AuthService);

  firebaseAuthService = inject(AngularFireAuth);

  signupWithEmailAndPassword(firebaseAuthDto: FirebaseAuthDto) {
    return from(
      this.firebaseAuthService.createUserWithEmailAndPassword(
        firebaseAuthDto.email,
        firebaseAuthDto.password
      )
    ).pipe(
      catchError((error: HttpErrorResponse) => {
        return this.errorService.handleError(error);
      }),
      switchMap(this.handleUserData)
    );
  }

  loginWithEmailAndPassword(firebaseAuthDto: FirebaseAuthDto) {
    return from(
      this.firebaseAuthService.signInWithEmailAndPassword(
        firebaseAuthDto.email,
        firebaseAuthDto.password
      )
    ).pipe(
      catchError((error: HttpErrorResponse) => {
        return this.errorService.handleError(error);
      }),
      switchMap(this.handleUserDataLogin)
    );
  }

  signupWithGoogle() {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account'
    });
    return this.signupWithProvider(provider);
  }

  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account'
    });
    return this.loginWithProvider(provider);
  }

  private signupWithProvider(provider: AuthProvider) {
    return from(this.firebaseAuthService.signInWithPopup(provider)).pipe(
      catchError((error: HttpErrorResponse) => {
        return this.errorService.handleError(error);
      }),
      switchMap(this.handleUserData)
    );
  }

  private loginWithProvider(provider: AuthProvider) {
    return from(this.firebaseAuthService.signInWithPopup(provider)).pipe(
      catchError((error: HttpErrorResponse) => {
        return this.errorService.handleError(error);
      }),
      switchMap(this.handleUserDataLogin)
    );
  }

  private handleUserData = (firebaseUserData: firebase.auth.UserCredential) => {
    const currentUser = firebaseUserData.user;
    if (currentUser) {
      const token = currentUser.getIdToken();

      return from(token).pipe(
        switchMap((token) => {
          return this.authService.signup({ firebaseToken: token });
        })
      );
    } else {
      return throwError(() => new Error('Firebase signup failed'));
    }
  };

  private handleUserDataLogin = (
    firebaseUserData: firebase.auth.UserCredential
  ) => {
    const currentUser = firebaseUserData.user;
    if (currentUser) {
      const token = currentUser.getIdToken();
      return from(token).pipe(
        switchMap((token) => {
          return this.authService.login({ firebaseToken: token });
        })
      );
    } else {
      return throwError(() => new Error('Firebase signup failed'));
    }
  };

  logout() {
    this.firebaseAuthService
      .signOut()
      .then(() => {
        localStorage.removeItem('access');
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
