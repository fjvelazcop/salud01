# Salud App - Angular 19 Application

## Descripción
Aplicación web con frontend en Angular 19 que incluye autenticación básica, registro de usuarios y dashboard con navegación por roles (Administrador y Usuario).

## Características
- ✅ Autenticación básica con login/registro
- ✅ Dashboard con navegación por roles
- ✅ Gestión de usuarios y roles
- ✅ Interfaz moderna y responsive
- ✅ Configuración completa de Angular Material

## Estructura del Proyecto

```
salud-app/
├── src/
│   ├── app/
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── dashboard/
│   │   │   ├── admin/
│   │   │   └── user/
│   │   ├── shared/
│   │   │   ├── models/
│   │   │   └── services/
│   │   ├── guards/
│   │   ├── app.routes.ts
│   │   └── app.component.ts
│   └── assets/
└── README.md
```

## Instalación y Configuración

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Ejecutar la aplicación:**
   ```bash
   ng serve
   ```

3. **Acceder a la aplicación:**
   - Login: http://localhost:4200/login
   - Registro: http://localhost:4200/register
   - Dashboard: http://localhost:4200/dashboard

## Credenciales de Prueba

- **Administrador:**
  - Email: admin@example.com
  - Contraseña: admin123

- **Usuario:**
  - Email: user@example.com
  - Contraseña: user123

## Tecnologías Utilizadas

- **Frontend:** Angular 19
- **Estilos:** Angular Material
- **Rutas:** Angular Router
- **Autenticación:** Servicios mock con localStorage
- **Navegación:** Guards para protección de rutas

## Estructura de Rutas

- `/login` - Pantalla de login
- `/register` - Registro de usuarios
- `/dashboard/admin` - Dashboard de administrador
- `/dashboard/user` - Dashboard de usuario

## Configuración de Desarrollo

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
ng serve

# Construir para producción
ng build
```

## Notas de Desarrollo

- La aplicación utiliza servicios mock para autenticación
- Los datos se almacenan en localStorage
- La navegación está protegida por guards
- El diseño es responsive y mobile-first
