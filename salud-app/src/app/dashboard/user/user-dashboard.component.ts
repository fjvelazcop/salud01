import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-user-dashboard',
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
    MatMenuModule
  ],
  template: `
    <div class="dashboard-container">
      <mat-toolbar color="primary" class="toolbar">
        <button mat-icon-button (click)="sidenav.toggle()">
          <mat-icon>menu</mat-icon>
        </button>
        <span>Mi Panel de Usuario</span>
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
            <a mat-list-item routerLink="/dashboard/user" routerLinkActive="active">
              <mat-icon matListIcon>dashboard</mat-icon>
              <span>Inicio</span>
            </a>
            <a mat-list-item routerLink="/dashboard/user/profile" routerLinkActive="active">
              <mat-icon matListIcon>person</mat-icon>
              <span>Mi Perfil</span>
            </a>
            <a mat-list-item routerLink="/dashboard/user/history" routerLinkActive="active">
              <mat-icon matListIcon>history</mat-icon>
              <span>Historial</span>
            </a>
            <a mat-list-item routerLink="/dashboard/user/settings" routerLinkActive="active">
              <mat-icon matListIcon>settings</mat-icon>
              <span>Configuración</span>
            </a>
          </mat-nav-list>
        </mat-sidenav>

        <mat-sidenav-content class="content">
          <div class="welcome-section">
            <mat-card>
              <mat-card-header>
                <mat-card-title>Bienvenido, {{ currentUser?.fullName }}</mat-card-title>
                <mat-card-subtitle>Tu espacio personal</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <p>Desde aquí puedes gestionar tu perfil, ver tu historial y configurar tus preferencias.</p>
                
                <div class="info-grid">
                  <mat-card class="info-card">
                    <mat-card-content>
                      <mat-icon class="info-icon">email</mat-icon>
                      <h3>Email</h3>
                      <p>{{ currentUser?.email }}</p>
                    </mat-card-content>
                  </mat-card>
                  
                  <mat-card class="info-card">
                    <mat-card-content>
                      <mat-icon class="info-icon">person</mat-icon>
                      <h3>Rol</h3>
                      <p>{{ currentUser?.role | titlecase }}</p>
                    </mat-card-content>
                  </mat-card>
                  
                  <mat-card class="info-card">
                    <mat-card-content>
                      <mat-icon class="info-icon">calendar_today</mat-icon>
                      <h3>Miembro desde</h3>
                      <p>{{ currentUser?.createdAt | date:'mediumDate' }}</p>
                    </mat-card-content>
                  </mat-card>
                </div>

                <div class="quick-actions">
                  <h3>Acciones Rápidas</h3>
                  <div class="actions-grid">
                    <button mat-raised-button color="primary" (click)="editProfile()">
                      <mat-icon>edit</mat-icon>
                      Editar Perfil
                    </button>
                    <button mat-raised-button color="accent" (click)="viewHistory()">
                      <mat-icon>history</mat-icon>
                      Ver Historial
                    </button>
                    <button mat-raised-button (click)="changePassword()">
                      <mat-icon>lock</mat-icon>
                      Cambiar Contraseña
                    </button>
                  </div>
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
      max-width: 800px;
      margin: 0 auto;
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin: 20px 0;
    }

    .info-card {
      text-align: center;
      padding: 20px;
    }

    .info-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      color: #3f51b5;
      margin-bottom: 10px;
    }

    .quick-actions {
      margin-top: 30px;
    }

    .actions-grid {
      display: flex;
      gap: 15px;
      flex-wrap: wrap;
      margin-top: 15px;
    }

    .active {
      background-color: #e3f2fd;
    }
  `]
})
export class UserDashboardComponent implements OnInit {
  currentUser: any;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
  }

  editProfile(): void {
    // Implementar navegación a edición de perfil
    console.log('Editar perfil');
  }

  viewHistory(): void {
    // Implementar navegación a historial
    console.log('Ver historial');
  }

  changePassword(): void {
    // Implementar cambio de contraseña
    console.log('Cambiar contraseña');
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
