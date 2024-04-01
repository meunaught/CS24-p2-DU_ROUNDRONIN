## EcoSync (Code Samurai 2024 – Phase 2)

Administrative panel prototype for DNCC solid waste management, built during a hackathon. The problem statement is in `Code Samurai 2024 - Phase 2 Problem.md`.

### Monorepo Layout
- `fast-server/`: FastAPI backend (Auth, Users, RBAC), PostgreSQL via Docker
- `next-app/`: Next.js 14 frontend (admin/user dashboards and auth views)
- `docker-compose.yml`: Spins up frontend, backend, and PostgreSQL

### Prerequisites
Have these ports available:
- 3000 (frontend)
- 5000 (backend) — note: macOS can reserve port 5000 due to AirDrop; change if needed
- 5432 (database)

Install requirements:
- Docker and Docker Compose

### Quick Start (Docker)
Run all services:
```bash
docker compose up --build
```

URLs:
- Frontend: http://localhost:3000
- Backend (FastAPI): http://localhost:5000

Seeded default credentials (created on backend startup):
- Username: admin@cs.com
- Password: admin

### Backend Overview
- Framework: FastAPI
- Auth: OAuth2 password flow with JWT (bearer token)
- Database: PostgreSQL via SQLAlchemy ORM
- Automatic seed on startup: roles, a superuser, and a basic permission (see `app/database.py`)

Base URL: `http://localhost:5000`

Selected endpoints (see `app/routers`):
- Auth (`/auth`)
  - `POST /auth/login` (form-data `username`, `password`) → `{ access_token, token_type }`
  - `POST /auth/logout` → clears `bearer` cookie (stateless JWT remains client-side)
  - `PUT  /auth/change-password` (requires bearer) → updates password
  - `POST /auth/reset-password/initiate` (stub)
  - `POST /auth/reset-password/confirm` (stub)
- Users (`/users`)
  - `GET  /users/` → list users (System Admin only)
  - `GET  /users/roles` → list roles
  - `GET  /users/{userId}` → get user by id
  - `POST /users/` → create user (System Admin only)
  - `PUT  /users/{userId}` → update own email or admin can update any
  - `PUT  /users/{userId}/roles/` → assign role to user (System Admin only)
  - `DELETE /users/{userId}` → delete user (System Admin only)
- RBAC (`/rbac`)
  - `GET    /rbac/permissions` → list permissions (System Admin only)
  - `GET    /rbac/roles/{roleId}/permissions` → permissions for a role (System Admin only)
  - `POST   /rbac/roles` → create role (System Admin only)
  - `POST   /rbac/permissions` → create permission (System Admin only)
  - `POST   /rbac/roles/{roleId}/permissions/` → add permission to role (System Admin only)
  - `DELETE /rbac/roles/{roleId}` → delete role (cannot delete default `1000`)

Auth details:
- Token URL: `/auth/login`
- Include header: `Authorization: Bearer <token>`
- Superuser check is based on `role_id == 1001`

### Frontend Overview
- Framework: Next.js 14, React 18, Tailwind CSS, MUI/Ant Design
- App routes under `next-app/app/`
  - `(auth)/login`, `(auth)/resetpassword`, `(auth)/newpassword`
  - `admin/*` and `user/*` dashboard layouts and pages

### Troubleshooting
- If port 5000 conflicts on macOS: either stop the conflicting service or change the published port in `docker-compose.yml`.
- Reset DB data volume if migrations/seeding are inconsistent:
  ```bash
  docker compose down
  docker volume ls | grep postgres-data
  docker volume rm <the_project_scoped_postgres-data_volume>
  docker compose up --build
  ```

### Attribution
This repository implements core parts of the Code Samurai 2024 – Phase 2 problem. See `Code Samurai 2024 - Phase 2 Problem.md` for the full brief, scope, and scoring.