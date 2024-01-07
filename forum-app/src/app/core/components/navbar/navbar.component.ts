import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';

import { logout } from '../../store/auth/auth.actions';
import { isAuthPipe } from '../../../shared/pipes/is-auth.pipe';
import { isAdminPipe } from '../../../shared/pipes/is-admin.pipe';
import { AuthStateModel } from '../../models/auth-state.model';
import { ButtonModule } from 'primeng/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  jamHomeF,
  jamMessagesF,
  jamPieChartF,
  jamUser
} from '@ng-icons/jam-icons';
import {FirebaseService} from "../../services/firebase/firebase.service";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    isAuthPipe,
    isAdminPipe,
    ButtonModule,
    NgIcon,
    RouterLinkActive
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    provideIcons({ jamHomeF, jamMessagesF, jamPieChartF, jamUser })
  ]
})
export class NavbarComponent {
  @Input() authState!: AuthStateModel;

  @Output() navigate = new EventEmitter();

  store = inject(Store<AuthStateModel>);

  firebase = inject(FirebaseService);

  router = inject(Router);

  closeMenu() {
    this.navigate.emit();
  }

  logout() {
    this.firebase.logout();
    this.store.dispatch(logout());
    return this.router.navigate(['']);
  }
}
