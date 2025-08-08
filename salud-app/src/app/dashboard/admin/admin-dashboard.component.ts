import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatMenuModule
  ],
  template: `
    <div class="dashboard-container">
      <mat-toolbar color="primary" class="toolbar">
        <button mat-icon-button (click)="sidenav.toggle()">
          <mat-icon>menu</mat-icon>
        </button>
        <span>Panel de Administración</span>
        <span class="spacer"></span>
        <button mat-button [matMenuTriggerFor]="userMenu">
          <mat-icon>account_circle</mat-icon>
          {{ currentUser?.fullName }}
        </button>
        <mat-menu #userMenu="matMenu">
          <button mat-menu-item (click)="logout()">
            <mat-icon>exit_to_app</mat-icon>
            <span>Cerrar Sesión</span>
          </button>
        </mat-menu>
      </mat-toolbar>

      <mat-sidenav-container class="sidenav-container">
        <mat-sidenav #sidenav mode="side" opened class="sidenav">
          <mat-nav-list>
            <a mat-list-item routerLink="/dashboard/admin" routerLinkActive="active">
              <mat-icon matListIcon>dashboard</mat-icon>
              <span>Dashboard</span>
            </a>
            <a mat-list-item routerLink="/dashboard/admin/users" routerLinkActive="active">
              <mat-icon matListIcon>people</mat-icon>
              <span>Usuarios</span>
            </a>
            <a mat-list-item routerLink="/dashboard/admin/settings" routerLinkActive="active">
              <mat-icon matListIcon>settings</mat-icon>
              <span>Configuración</span>
            </a>
          </mat-nav-list>
        </mat-sidenav>

        <mat-sidenav-content class="content">
          <div class="welcome-section">
            <mat-card>
              <mat-card-header>
                <mat-card-title>Bienvenido, Administrador</mat-card-title>
                <mat-card-subtitle>Gestión de usuarios y sistema</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <p>Desde aquí puedes gestionar todos los usuarios del sistema, ver estadísticas y configurar opciones del sistema.</p>
                
                <div class="stats-grid">
                  <mat-card class="stat-card">
                    <mat-card-content>
                      <h3>Total Usuarios</h3>
                      <p class="stat-number">{{ users.length }}</p>
                    </mat-card-content>
                  </mat-card>
                  
                  <mat-card class="stat-card">
                    <mat-card-content>
                      <h3>Administradores</h3>
                      <p class="stat-number">{{ getAdminCount() }}</p>
                    </mat-card-content>
                  </mat-card>
                  
                  <mat-card class="stat-card">
                    <mat-card-content>
                      <h3>Usuarios Regulares</h3>
                      <p class="stat-number">{{ getUserCount() }}</p>
                    </mat-card-content>
                  </mat-card>
                </div>

                <div class="users-table">
                  <h3>Lista de Usuarios</h3>
                  <table mat-table [dataSource]="users" class="mat-elevation-z8">
                    <ng-container matColumnDef="name">
                      <th mat-header-cell *matHeaderCellDef> Nombre </th>
                      <td mat-cell *matCellDef="let user"> {{user.fullName}} </td>
                    </ng-container>

                    <ng-container matColumnDef="email">
                      <th mat-header-cell *matHeaderCellDef> Email </th>
                      <td mat-cell *matCellDef="let user"> {{user.email}} </td>
                    </ng-container>

                    <ng-container matColumnDef="role">
                      <th mat-header-cell *matHeaderCellDef> Rol </th>
                      <td mat-cell *matCellDef="let user"> {{user.role}} </td>
                    </ng-container>

                    <ng-container matColumnDef="created">
                      <th mat-header-cell *matHeaderCellDef> Fecha de Registro </th>
                      <td mat-cell *matCellDef="let user"> {{user.createdAt | date:'short'}} </td>
                    </ng-container>

                    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                    <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
                  </table>
                </div>
              </mat-card-content>
            </mat-card>
          </div>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
  styles: [`
    .dashboard-container {
      height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .toolbar {
      position: fixed;
      top: 0;
      z-index: 1000;
    }

    .spacer {
      flex: 1 1 auto;
    }

    .sidenav-container {
      flex: 1;
      margin-top: 64px;
    }

    .sidenav {
      width: 250px;
      background-color: #f5f5f5;
    }

    .content {
      padding: 20px;
      background-color: #fafafa;
    }

    .welcome-section {
      max-width: 1200px;
      margin: 0 auto;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin: 20px 0;
    }

    .stat-card {
      text-align: center;
      padding: 20px;
    }

    .stat-number {
      font-size: 2rem;
      font-weight: bold;
      color: #3f51b5;
      margin: 10px 0;
    }

    .users-table {
      margin-top: 30px;
    }

    table {
      width: 100%;
    }

    .active {
      background-color: #e3f2fd;
    }
  `]
})
export class AdminDashboardComponent implements OnInit {
  currentUser: any;
  users: any[] = [];
  displayedColumns: string[] = ['name', 'email', 'role', 'created'];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.loadUsers();
  }

  loadUsers(): void {
    // Simulación de usuarios - en producción vendrían de un servicio
    this.users = [
      {
        id: '1',
        fullName: 'Administrador Principal',
        email: 'admin@example.com',
        role: 'admin',
        createdAt: new Date('2024-01-01')
      },
      {
        id: '2',
        fullName: 'Usuario Demo',
        email: 'user@example.com',
        role: 'user',
        createdAt: new Date('2024-01-02')
      }
    ];
  }

  getAdminCount(): number {
    return this.users.filter(u => u.role === 'admin').length;
  }

  getUserCount(): number {
    return this.users.filter(u => u.role === 'user').length;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
