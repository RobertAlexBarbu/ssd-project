import { Routes } from '@angular/router';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { AdminsPageComponent } from './pages/admins-page/admins-page.component';
import { StatisticsPageComponent } from './pages/statistics-page/statistics-page.component';
import { AdminService } from './services/admin/admin.service';
import { ColorService } from './services/color/color.service';

export const adminRoutes: Routes = [
  {
    path: '',
    providers: [AdminService, ColorService],
    component: DashboardPageComponent,
    children: [
      {
        path: '',
        component: AdminsPageComponent
      },
      {
        path: 'statistics',
        component: StatisticsPageComponent
      }
    ]
  }
];
