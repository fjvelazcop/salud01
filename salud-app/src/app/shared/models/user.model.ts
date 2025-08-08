export interface User {
  id: string;
  email: string;
  fullName: string;
  password: string;
  role: 'admin' | 'user';
  createdAt: Date;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
