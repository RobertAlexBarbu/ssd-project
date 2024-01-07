import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {Store} from '@ngrx/store';
import {Router, RouterLink} from '@angular/router';
import {Subject, takeUntil} from 'rxjs';
import {ButtonModule} from 'primeng/button';
import {PasswordModule} from 'primeng/password';
import {
  FormUtilsService
} from '../../../../core/services/form-utils/form-utils.service';
import {DropdownModule} from 'primeng/dropdown';
import {
  ErrorComponent
} from '../../../../shared/components/error/error.component';
import {
  FirebaseService
} from '../../../../core/services/firebase/firebase.service';
import {
  OrDividerComponent
} from '../../../../shared/components/or-divider/or-divider.component';
import {AuthService} from '../../../../core/services/auth/auth.service';
import {login} from '../../../../core/store/auth/auth.actions';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    RouterLink,
    PasswordModule,
    DropdownModule,
    ErrorComponent,
    OrDividerComponent
  ],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss', '../auth.styles.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent implements OnDestroy {
  destroy$ = new Subject<boolean>();

  loading = false;

  error$: Subject<string> = new Subject<string>();

  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true
    }),
    password: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true
    })
  });

  firebaseService = inject(FirebaseService);

  authService = inject(AuthService);

  formUtils = inject(FormUtilsService);

  router = inject(Router);

  store = inject(Store);

  onSubmit() {
    this.error$.next('');
    if (!this.form.valid) {
      this.formUtils.markGroupDirty(this.form);
      return;
    }
    this.loading = true;
    this.firebaseService
      .loginWithEmailAndPassword(this.form.getRawValue())
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          console.log(data);
          this.store.dispatch(login({ authState: data }));
          this.loading = false;
          return this.router.navigate(['']);
        },
        error: (err: Error) => {
          this.formUtils.handleSubmitError(err, this.form, this.error$);
          this.loading = false;
        }
      });
  }

  loginGoogle() {
    this.error$.next('');
    this.firebaseService
      .loginWithGoogle()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          console.log(data);
          this.store.dispatch(login({ authState: data }));
          return this.router.navigate(['']);
        },
        error: (err: Error) => {
          this.formUtils.handleSubmitError(err, this.form, this.error$);
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }
}
