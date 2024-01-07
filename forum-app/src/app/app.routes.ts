import { Routes } from '@angular/router';
import { forumsRoutes } from './features/forums-feature/forums.routes';
import { isAdminGuard } from './core/guards/is-admin.guard';

export const routes: Routes = [
  ...forumsRoutes,
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth-feature/auth.routes').then((m) => m.authRoutes)
  },
  {
    path: 'admin',
    canMatch: [isAdminGuard],
    loadChildren: () =>
      import('./features/admin-feature/admin.routes').then((m) => m.adminRoutes)
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./features/profile-feature/profile.routes').then(
        (m) => m.profileRoutes
      )
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  }
];
