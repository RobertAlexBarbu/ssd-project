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
import {Router, RouterLink} from '@angular/router';
import {Store} from '@ngrx/store';
import {Subject, takeUntil} from 'rxjs';
import {AuthStateModel} from '../../../../core/models/auth-state.model';
import {ButtonModule} from 'primeng/button';
import {PasswordModule} from 'primeng/password';
import {
  passwordValidator
} from '../../../../shared/validators/password.validator';
import {
  FormUtilsService
} from '../../../../core/services/form-utils/form-utils.service';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {jamGoogle} from '@ng-icons/jam-icons';
import {
  FirebaseService
} from '../../../../core/services/firebase/firebase.service';
import {
  OrDividerComponent
} from '../../../../shared/components/or-divider/or-divider.component';
import {
  ErrorComponent
} from '../../../../shared/components/error/error.component';
import {signup} from '../../../../core/store/auth/auth.actions';
import {AuthService} from '../../../../core/services/auth/auth.service';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    RouterLink,
    PasswordModule,
    NgIcon,
    OrDividerComponent,
    ErrorComponent
  ],
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss', '../auth.styles.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [provideIcons({ jamGoogle })]
})
export class SignupPageComponent implements OnDestroy {
  destroy$ = new Subject<boolean>();

  error$: Subject<string> = new Subject<string>();

  loading = false;

  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true
    }),
    password: new FormControl('', {
      validators: [
        Validators.maxLength(1000),
        Validators.required,
        Validators.minLength(8),
        passwordValidator
      ],
      nonNullable: true
    })
  });

  firebaseService = inject(FirebaseService);

  authService = inject(AuthService);

  router = inject(Router);

  store = inject(Store<{ auth: AuthStateModel }>);

  formUtils = inject(FormUtilsService);

  onSubmit() {
    this.error$.next('');
    if (!this.form.valid) {
      this.formUtils.markGroupDirty(this.form);
      return;
    }
    this.loading = true;
    this.firebaseService
      .signupWithEmailAndPassword(this.form.getRawValue())
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          console.log(data);
          this.store.dispatch(signup({ authState: data }));
          this.loading = false;
          return this.router.navigate(['']);
        },
        error: (err) => {
          this.formUtils.handleSubmitError(err, this.form, this.error$);
          this.loading = false;
        }
      });
  }

  signupGoogle() {
    this.firebaseService
      .signupWithGoogle()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          console.log(data);
          this.store.dispatch(signup({ authState: data }));
          return this.router.navigate(['']);
        },
        error: (err) => {
          this.formUtils.handleSubmitError(err, this.form, this.error$);
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }
}
