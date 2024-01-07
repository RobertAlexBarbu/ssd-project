import { inject, Pipe, PipeTransform } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { AuthStateModel } from '../../core/models/auth-state.model';

@Pipe({
  name: 'isUser',
  standalone: true
})
export class IsUserPipe implements PipeTransform {
  authService = inject(AuthService);

  transform(value: AuthStateModel, arg: string): boolean {
    return this.authService.isUser(value, arg);
  }
}
