import { CanMatchFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { catchError, map, of } from 'rxjs';

export const isAdminGuard: CanMatchFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.checkAuth().pipe(
    map((state) => {
      if (authService.isAdmin(state)) {
        return true;
      } else {
        return router.parseUrl('');
      }
    }),
    catchError(() => {
      return of(router.parseUrl(''));
    })
  );
};
