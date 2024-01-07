import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { AuthService } from './core/services/auth/auth.service';
import { Store } from '@ngrx/store';
import { isAuth } from './core/store/auth/auth.actions';
import { HeaderComponent } from './core/components/header/header.component';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AuthStateModel } from './core/models/auth-state.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './core/services/http/http.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'forum-app';

  check$ = new Subject<boolean>();

  destroy$ = new Subject<boolean>();

  authState$!: Observable<AuthStateModel>;

  authService = inject(AuthService);

  store = inject(Store);

  router = inject(Router);

  http = inject(HttpClient);


  ngOnInit() {
    this.authState$ = this.store.select('auth');
    this.authService
      .checkAuth()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.check$.next(true);
          console.log(data);
          this.store.dispatch(isAuth({ authState: data }));
        },
        error: () => {
          this.check$.next(true);
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }
}
