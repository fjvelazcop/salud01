import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  template: `
    <div class="profile-container">
      <mat-card class="profile-card">
        <mat-card-header>
          <mat-card-title>Actualizar Perfil</mat-card-title>
          <mat-card-subtitle>Modifica tus datos personales</mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <form [formGroup]="profileForm" (ngSubmit)="onUpdateProfile()">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Nombre completo</mat-label>
              <input matInput formControlName="fullName" placeholder="Tu nombre completo">
              <mat-error *ngIf="profileForm.get('fullName')?.hasError('required')">
                El nombre es requerido
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Correo electrónico</mat-label>
              <input matInput type="email" formControlName="email" placeholder="ejemplo@correo.com" disabled>
            </mat-form-field>

            <button mat-raised-button color="primary" type="submit" [disabled]="profileForm.invalid || loading" class="full-width">
              Actualizar Perfil
            </button>
          </form>
        </mat-card-content>
      </mat-card>

      <mat-card class="profile-card" style="margin-top: 20px;">
        <mat-card-header>
          <mat-card-title>Cambiar Contraseña</mat-card-title>
          <mat-card-subtitle>Actualiza tu contraseña</mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <form [formGroup]="passwordForm" (ngSubmit)="onChangePassword()">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Contraseña actual</mat-label>
              <input matInput [type]="hideCurrentPassword ? 'password' : 'text'" formControlName="currentPassword">
              <button mat-icon-button matSuffix (click)="hideCurrentPassword = !hideCurrentPassword" type="button">
                <mat-icon>{{hideCurrentPassword ? 'visibility_off' : 'visibility'}}</mat-icon>
              </button>
              <mat-error *ngIf="passwordForm.get('currentPassword')?.hasError('required')">
                La contraseña actual es requerida
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Nueva contraseña</mat-label>
              <input matInput [type]="hideNewPassword ? 'password' : 'text'" formControlName="newPassword">
              <button mat-icon-button matSuffix (click)="hideNewPassword = !hideNewPassword" type="button">
                <mat-icon>{{hideNewPassword ? 'visibility_off' : 'visibility'}}</mat-icon>
              </button>
              <mat-error *ngIf="passwordForm.get('newPassword')?.hasError('required')">
                La nueva contraseña es requerida
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Confirmar nueva contraseña</mat-label>
              <input matInput [type]="hideConfirmPassword ? 'password' : 'text'" formControlName="confirmNewPassword">
              <button mat-icon-button matSuffix (click)="hideConfirmPassword = !hideConfirmPassword" type="button">
                <mat-icon>{{hideConfirmPassword ? 'visibility_off' : 'visibility'}}</mat-icon>
              </button>
              <mat-error *ngIf="passwordForm.hasError('mismatch')">
                Las contraseñas no coinciden
              </mat-error>
            </mat-form-field>

            <button mat-raised-button color="primary" type="submit" [disabled]="passwordForm.invalid || loading" class="full-width">
              Cambiar Contraseña
            </button>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .profile-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
      background: white;
      color: black;
      min-height: 100vh;
    }
    .profile-card {
      width: 100%;
      max-width: 400px;
      padding: 20px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.1);
      border-radius: 12px;
      background: white;
      color: black;
    }
    .full-width {
      width: 100%;
      margin-bottom: 16px;
    }
  `]
})
export class ProfileComponent {
  profileForm: FormGroup;
  passwordForm: FormGroup;
  loading = false;
  hideCurrentPassword = true;
  hideNewPassword = true;
  hideConfirmPassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    const currentUser = this.authService.getCurrentUser();
    this.profileForm = this.fb.group({
      fullName: [currentUser?.fullName || '', Validators.required],
      email: [{ value: currentUser?.email || '', disabled: true }]
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmNewPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(group: FormGroup) {
    const newPassword = group.get('newPassword')?.value;
    const confirmNewPassword = group.get('confirmNewPassword')?.value;
    return newPassword === confirmNewPassword ? null : { mismatch: true };
  }

  onUpdateProfile() {
    if (this.profileForm.valid) {
      this.loading = true;
      const updatedData = {
        fullName: this.profileForm.get('fullName')?.value
      };
      // Simulate update user profile
      setTimeout(() => {
        this.loading = false;
        this.snackBar.open('Perfil actualizado correctamente', 'Cerrar', { duration: 3000 });
      }, 1000);
    }
  }

  onChangePassword() {
    if (this.passwordForm.valid) {
      this.loading = true;
      const currentPassword = this.passwordForm.get('currentPassword')?.value;
      const newPassword = this.passwordForm.get('newPassword')?.value;
      // Simulate password change logic
      setTimeout(() => {
        this.loading = false;
        if (currentPassword === 'user123') { // Simulated current password check
          this.snackBar.open('Contraseña cambiada correctamente', 'Cerrar', { duration: 3000 });
          this.passwordForm.reset();
        } else {
          this.snackBar.open('Contraseña actual incorrecta', 'Cerrar', { duration: 3000 });
        }
      }, 1000);
    }
  }
}
