import { CanMatchFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { catchError, map, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { logout } from '../store/auth/auth.actions';

export const isAuthGuard: CanMatchFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const store = inject(Store);
  return authService.checkAuth().pipe(
    map((state) => {
      if (authService.isAuth(state)) {
        return true;
      } else {
        return router.parseUrl('');
      }
    }),
    catchError(() => {
      store.dispatch(logout());
      return of(router.parseUrl(''));
    })
  );
};
