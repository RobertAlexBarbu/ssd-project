import { inject, Pipe, PipeTransform } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { AuthStateModel } from '../../core/models/auth-state.model';

@Pipe({
  name: 'isAuth',
  pure: true,
  standalone: true
})
export class isAuthPipe implements PipeTransform {
  authService = inject(AuthService);

  transform(value: AuthStateModel): boolean {
    return this.authService.isAuth(value);
  }
}
