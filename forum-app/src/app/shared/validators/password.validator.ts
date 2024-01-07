import { ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordValidator: ValidatorFn = (control) => {
  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z]).{8,}$/;
  if (passwordRegex.test(control.value)) {
    return null;
  } else {
    return {
      password: 'Needs at least one uppercase letter'
    } as ValidationErrors;
  }
};
