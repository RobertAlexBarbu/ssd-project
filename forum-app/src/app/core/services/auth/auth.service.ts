import { inject, Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { AuthStateModel } from '../../models/auth-state.model';
import { FirebaseTokenDto } from '../../../features/auth-feature/dto/firebase-token.dto';
import { Roles } from '../../models/roles.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpService = inject(HttpService);

  login(firebaseTokenDto: FirebaseTokenDto) {
    localStorage.setItem('access', firebaseTokenDto.firebaseToken);
    return this.httpService.post<AuthStateModel, FirebaseTokenDto>(
      'auth/login',
      firebaseTokenDto
    );
  }

  signup(firebaseTokenDto: FirebaseTokenDto) {
    localStorage.setItem('access', firebaseTokenDto.firebaseToken);
    return this.httpService.post<AuthStateModel, FirebaseTokenDto>(
      'users',
      firebaseTokenDto
    );
  }



  checkAuth() {
    return this.httpService.post<AuthStateModel>('auth/check', {});
  }

  isAuth(state: AuthStateModel) {
    return state.role !== Roles.None;
  }

  isAdmin(state: AuthStateModel) {
    return state.role === Roles.Admin;
  }

  isUser(state: AuthStateModel, id: string) {
    return state.id === id;
  }

}
