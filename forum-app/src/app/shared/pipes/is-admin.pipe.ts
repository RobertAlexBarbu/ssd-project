import { inject, Pipe, PipeTransform } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { AuthStateModel } from '../../core/models/auth-state.model';

@Pipe({
  name: 'isAdmin',
  pure: true,
  standalone: true
})
export class isAdminPipe implements PipeTransform {
  authService = inject(AuthService);

  transform(value: AuthStateModel): boolean {
    return this.authService.isAdmin(value);
  }
}
