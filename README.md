# Sistema de Gestión - Full Stack Application

Sistema completo de gestión de empleados y solicitudes con autenticación JWT.

## 🚀 Stack Tecnológico

### Backend
- Node.js + Express.js 5.1.0
- PostgreSQL 15
- Knex.js (Query Builder & Migrations)
- JWT (jsonwebtoken + bcrypt)
- Awilix (Dependency Injection)
- Clean Architecture

### Frontend
- React 19.1.1 (SPA)
- React Router DOM 6.20.0
- Context API (State Management)
- Axios
- Vite
- CSS Vanilla

### DevOps
- Docker & Docker Compose
- Multi-container setup

## 📋 Requisitos

- Docker & Docker Compose
- Node.js 18+ (para desarrollo local)

## ⚡ Inicio Rápido

### Con Docker Compose (Recomendado)

```bash
# Iniciar todos los servicios
docker compose up -d

# Ver logs
docker compose logs -f

# Detener
docker compose down
```

Servicios disponibles:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **PostgreSQL**: localhost:5432

### Desarrollo Local

#### Backend
```bash
cd backend
npm install
npm run migrate
npm run seed
npm start
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 👥 Usuarios de Prueba

```
Admin:
  username: admin
  password: admin123

User:
  username: user
  password: user123
```

## 📡 API Endpoints

### Autenticación
- `POST /auth/register` - Registrar usuario
- `POST /auth/login` - Iniciar sesión
- `POST /auth/logout` - Cerrar sesión (requiere autenticación)
- `GET /auth/me` - Usuario actual (requiere autenticación)

### Empleados
- `GET /employees/:id` - Obtener empleado (requiere autenticación)
- `POST /employees` - Crear empleado (requiere autenticación)

### Solicitudes
- `GET /requests/:id` - Obtener solicitud (requiere autenticación)
- `POST /requests` - Crear solicitud (requiere autenticación)
- `DELETE /requests/:id` - Eliminar solicitud (requiere rol admin)

## 🎨 Capturas de Pantalla del Frontend

El frontend es una SPA moderna con:
- ✅ Login/Register con validación
- ✅ Dashboard interactivo
- ✅ Gestión de empleados
- ✅ Gestión de solicitudes
- ✅ Control de acceso por roles
- ✅ Diseño responsive
- ✅ Estados de carga y errores

## 🏗️ Arquitectura

### Backend (Clean Architecture)

```
backend/
├── src/
│   ├── common/
│   │   └── container.js          # DI Container
│   ├── database/
│   │   ├── connection.js
│   │   ├── migrations/           # 4 migraciones
│   │   └── seeds/                # Users seed
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── domain/           # User, Session
│   │   │   ├── infrastructure/   # Repositories, JWT
│   │   │   ├── application/      # Use Cases
│   │   │   └── presentation/     # Routes, Middleware
│   │   ├── employees/
│   │   │   ├── domain/           # Employee
│   │   │   ├── infrastructure/   # Repository
│   │   │   ├── application/      # Use Cases
│   │   │   └── presentation/     # Routes
│   │   └── requests/
│   │       ├── domain/           # Request
│   │       ├── infrastructure/   # Repository
│   │       ├── application/      # Use Cases
│   │       └── presentation/     # Routes
│   └── index.js
└── Dockerfile
```

### Frontend (Component-Based)

```
frontend/
├── src/
│   ├── components/
│   │   ├── Layout.jsx            # Layout con Navbar
│   │   └── PrivateRoute.jsx      # Route Protection
│   ├── context/
│   │   └── AuthContext.jsx       # Auth State Management
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Employees.jsx
│   │   ├── EmployeeDetail.jsx
│   │   ├── CreateEmployee.jsx
│   │   ├── Requests.jsx
│   │   ├── RequestDetail.jsx
│   │   ├── CreateRequest.jsx
│   │   └── Profile.jsx
│   ├── services/
│   │   ├── api.js                # Axios instance
│   │   └── index.js              # API services
│   └── App.jsx
└── Dockerfile
```

## 🔒 Seguridad

- ✅ Passwords hasheados con bcrypt (10 rounds)
- ✅ JWT con tokens de acceso (1h) y refresh (7d)
- ✅ Sesiones almacenadas en base de datos
- ✅ Queries parametrizadas (SQL injection protection)
- ✅ Middleware de autenticación
- ✅ Control de acceso basado en roles (RBAC)
- ✅ Interceptores de Axios para manejo de tokens
- ✅ Rutas protegidas en frontend

## 📊 Base de Datos

### Tablas:
1. **empleado** - Empleados del sistema
2. **solicitud** - Solicitudes (FK a empleado)
3. **users** - Usuarios del sistema
4. **sessions** - Sesiones JWT activas

## 🛠️ Comandos Útiles

### Docker
```bash
# Iniciar todo
docker compose up -d

# Ver logs
docker compose logs -f

# Ver logs específicos
docker compose logs -f backend
docker compose logs -f frontend

# Reconstruir
docker compose up -d --build

# Detener
docker compose down

# Limpiar todo
docker compose down -v
```

### Backend
```bash
# Migraciones
docker compose exec backend npm run migrate
docker compose exec backend npm run migrate:rollback
docker compose exec backend npm run migrate:make nombre

# Seeds
docker compose exec backend npm run seed

# Base de datos
docker compose exec postgres psql -U postgres -d mydatabase
```

### Frontend
```bash
# Desarrollo
npm run dev

# Build
npm run build

# Preview
npm run preview
```

## 🧪 Testing

### Probar la API
```bash
# Health check
curl http://localhost:3000/health

# Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

### Usar el script de pruebas
```bash
./test-api.sh
```

## 🌐 Flujo de Usuario

1. **Login** → Obtiene JWT token
2. **Dashboard** → Vista general del sistema
3. **Crear Empleado** → Formulario de creación
4. **Ver Empleado** → Detalles y opciones
5. **Crear Solicitud** → Vinculada a un empleado
6. **Ver Solicitud** → Con opción de eliminar (solo admin)
7. **Logout** → Cierra sesión

## 📱 Características del Frontend

### Context API
- Estado global de autenticación
- Persistencia en localStorage
- Interceptores de Axios
- Manejo automático de tokens

### Rutas Protegidas
- Redirect automático a login
- Verificación de autenticación
- Control de acceso por rol

### UX/UI
- Diseño moderno y limpio
- Gradiente en login/register
- Cards y badges
- Estados de loading
- Empty states
- Mensajes de error/éxito
- Responsive design

## 🎯 Patrones Implementados

### Backend
- Clean Architecture
- Dependency Injection
- Repository Pattern
- Use Case Pattern
- Middleware Pattern

### Frontend
- Context API Pattern
- Higher-Order Components (HOC)
- Service Layer
- Protected Routes
- Container/Presenter Pattern

## 🔄 Flujo de Datos

```
Frontend (React)
    ↓
Context API (Auth State)
    ↓
Axios Interceptors
    ↓
API Services
    ↓
Backend Routes
    ↓
Middleware (Auth)
    ↓
Use Cases
    ↓
Repositories
    ↓
Database (PostgreSQL)
```

## 📈 Próximas Mejoras

### Backend
- [ ] Refresh token endpoint
- [ ] Paginación en endpoints
- [ ] Filtros y búsqueda
- [ ] Rate limiting
- [ ] Logging avanzado
- [ ] Tests unitarios e integración

### Frontend
- [ ] Refresh token automático
- [ ] Paginación en listados
- [ ] Búsqueda y filtros en UI
- [ ] Tema oscuro
- [ ] Notificaciones toast
- [ ] Tests con Jest/RTL
- [ ] PWA support

## 🐛 Troubleshooting

### Backend no inicia
```bash
docker compose logs backend
docker compose restart backend
```

### Frontend no se conecta
1. Verificar que backend esté en puerto 3000
2. Revisar proxy en vite.config.js
3. Verificar VITE_API_URL en .env

### Base de datos
```bash
# Verificar conexión
docker compose exec postgres pg_isready -U postgres

# Acceder a psql
docker compose exec postgres psql -U postgres -d mydatabase
```

### Limpiar y reiniciar
```bash
docker compose down -v
docker compose up -d --build
```

## 📄 Documentación Adicional

- `backend/README.md` - Documentación del backend
- `frontend/README.md` - Documentación del frontend
- `test-api.sh` - Script de pruebas de API

## 👨‍💻 Desarrollo

### Agregar un nuevo endpoint
1. Crear migración en `backend/src/database/migrations`
2. Crear modelo en `domain`
3. Crear repositorio en `infrastructure`
4. Crear use case en `application`
5. Crear ruta en `presentation`
6. Registrar en `container.js`
7. Agregar servicio en frontend `services`
8. Crear componentes y páginas necesarias
