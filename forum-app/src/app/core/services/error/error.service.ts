import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  handleError(error: HttpErrorResponse) {
    console.log('error happened!');
    if (error.status === 401) {
      return throwError(() => new Error('⚠ Invalid credentials'));
    } else if (error.error) {
      return throwError(() => new Error('⚠ ' + error.error.message));
    } else {
      return throwError(() => new Error('⚠ ' + error.message));
    }
  }
}
