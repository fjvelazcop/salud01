import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User, LoginRequest, RegisterRequest } from '../models/user.model';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private platformId = inject(PLATFORM_ID);
  
  private users: User[] = [
    {
      id: '1',
      email: 'admin@example.com',
      fullName: 'Administrador Principal',
      password: 'admin123',
      role: 'admin',
      createdAt: new Date()
    },
    {
      id: '2',
      email: 'user@example.com',
      fullName: 'Usuario Demo',
      password: 'user123',
      role: 'user',
      createdAt: new Date()
    }
  ];

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadUserFromStorage();
    }
  }

  login(credentials: LoginRequest): Observable<User> {
    const user = this.users.find(
      u => u.email === credentials.email && u.password === credentials.password
    );

    if (user) {
      const userWithoutPassword = { ...user };
      delete (userWithoutPassword as any).password;
      
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      }
      this.currentUserSubject.next(userWithoutPassword);
      
      return of(userWithoutPassword).pipe(delay(1000));
    }

    return throwError(() => new Error('Credenciales inválidas')).pipe(delay(1000));
  }

  register(userData: RegisterRequest): Observable<User> {
    if (userData.password !== userData.confirmPassword) {
      return throwError(() => new Error('Las contraseñas no coinciden'));
    }

    const existingUser = this.users.find(u => u.email === userData.email);
    if (existingUser) {
      return throwError(() => new Error('El email ya está registrado'));
    }

    const newUser: User = {
      id: Date.now().toString(),
      email: userData.email,
      fullName: userData.fullName,
      password: userData.password,
      role: 'user',
      createdAt: new Date()
    };

    this.users.push(newUser);
    
    const userWithoutPassword = { ...newUser };
    delete (userWithoutPassword as any).password;
    
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
    }
    this.currentUserSubject.next(userWithoutPassword);
    
    return of(userWithoutPassword).pipe(delay(1000));
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('currentUser');
    }
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user?.role === role;
  }

  private loadUserFromStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      const userStr = localStorage.getItem('currentUser');
      if (userStr) {
        const user = JSON.parse(userStr);
        this.currentUserSubject.next(user);
      }
    }
  }
}
