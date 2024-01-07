import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ErrorService } from '../services/error/error.service';
import { catchError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (request, next) => {
  const errorService = inject(ErrorService);
  return next(request).pipe(catchError(errorService.handleError));
};
