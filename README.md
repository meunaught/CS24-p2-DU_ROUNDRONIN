## EcoSync (Code Samurai 2024 – Phase 2)

Hackathon prototype of an admin panel for DNCC solid waste management. Problem statement: [Code Samurai 2024 Phase 2 Problem](./Code%20Samurai%202024%20-%20Phase%202%20Problem.md)

### What We Built
- **Backend** (`fast-server/`): FastAPI + PostgreSQL (SQLAlchemy, Alembic) with JWT login, user management, and role-based access control
- **Frontend** (`next-app/`): Next.js 14 + Tailwind, MUI, and Ant Design, with login and password-reset views plus admin/user dashboards (user list, create user)
- **Startup seeding**: the four roles (Unassigned, System Admin, STS Manager, Landfill Manager) and a System Admin account
- **Docker Compose**: one command runs the frontend, backend, and database

### Run
Requires Docker, with ports 3000, 5000, and 5432 free (on macOS, AirPlay Receiver may hold 5000).

```bash
docker compose up --build
```

- Frontend: http://localhost:3000
- Backend: http://localhost:5000 (interactive docs at `/docs`)
- Login: `admin@cs.com` / `admin`

### API
| Prefix | Endpoints |
|---|---|
| `/auth` | `POST /login`, `POST /logout`, `PUT /change-password`, `POST /reset-password/initiate` and `/confirm` (stubs) |
| `/users` | `GET /`, `POST /`, `GET /roles`, `GET /{userId}`, `PUT /{userId}`, `DELETE /{userId}`, `PUT /{userId}/roles/` |
| `/rbac` | `GET /permissions`, `POST /permissions`, `POST /roles`, `DELETE /roles/{roleId}`, `GET /roles/{roleId}/permissions`, `POST /roles/{roleId}/permissions/` |

Send `Authorization: Bearer <token>` using the token from `/auth/login`. Admin-only routes require the System Admin role (`1001`); users can update their own details.
