import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormUtilsService {
  markGroupDirty(form: FormGroup) {
    Object.keys(form.controls).forEach((key) => {
      form.get(key)?.markAsDirty();
    });
  }

  handleSubmitError(
    error: Error,
    form: AbstractControl,
    error$: Subject<string>
  ) {
    error$.next(error.message);
    form.markAsUntouched();
    form.markAsPristine();
  }
}
