import { LoginPageComponent } from './pages/login-page/login-page.component';
import { Routes } from '@angular/router';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';

export const authRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginPageComponent
      },
      {
        path: 'signup',
        component: SignupPageComponent
      }
    ]
  }
];
