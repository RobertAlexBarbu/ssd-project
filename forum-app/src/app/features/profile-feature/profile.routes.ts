import { Routes } from '@angular/router';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';

export const profileRoutes: Routes = [
  {
    path: ':username',
    component: ProfilePageComponent
  }
];
