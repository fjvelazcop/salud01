import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'admin',
        loadComponent: () => import('./dashboard/admin/admin-dashboard.component').then(m => m.AdminDashboardComponent),
        canActivate: [RoleGuard],
        data: { role: 'admin' }
      },
      {
        path: 'user',
        loadComponent: () => import('./dashboard/user/user-dashboard.component').then(m => m.UserDashboardComponent),
        canActivate: [RoleGuard],
        data: { role: 'user' }
      }
    ]
  },
  { path: '**', redirectTo: '/login' }
];
