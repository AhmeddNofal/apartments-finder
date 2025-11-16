# Apartments Finder (monorepo)

A concise repo-level overview and quickstart for the Apartments Finder project. This repository contains two main sub-projects:

- `apartments-app/` — Frontend application (Next.js + MUI). See `apartments-app/README.md` for full frontend docs.
- `apartments-api/` — Backend API (NestJS + Mongoose + GridFS). See `apartments-api/README.md` for full API docs.

This top-level README explains how to run the entire system locally with a single command using Docker Compose, plus quick troubleshooting and useful commands.

---

**Quick summary**

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`
- MongoDB: `mongodb://localhost:27017` (data persisted to Docker volume `mongo-data`)
- Swagger UI (OpenAPI): `http://localhost:5000/api` (enable in backend to view)

All services are defined in `docker-compose.yml` at the repository root.

---

## One-command local setup (Docker Compose)

The simplest way to bring the entire stack up (MongoDB, backend, frontend) is with Docker Compose. From the repository root run either of the following in PowerShell:

```powershell
# If you have the old docker-compose binary
docker-compose up --build -d

# Or using the newer Docker CLI plugin
docker compose up --build -d
```

What this does:
- Builds the backend and frontend images (if needed)
- Starts a MongoDB container with a persistent volume (`mongo-data`)
- Starts the backend on port `5000` and the frontend on port `3000`

Wait a few seconds for services to finish starting. Then open:

- Frontend: `http://localhost:3000`
- Swagger / API (if Swagger is enabled in backend): `http://localhost:5000/api`

To stop and remove containers (keeping volumes):

```powershell
docker compose down
```

To stop and remove containers plus volumes (data will be lost):

```powershell
docker compose down -v
```

To follow logs for all services:

```powershell
docker compose logs -f
```

To follow logs for a single service (example: backend):

```powershell
docker compose logs -f backend
```

---

## Ports & environment (from docker-compose.yml)

- MongoDB: host `27017` → container `27017` (volume `mongo-data` persists data)
- Backend: host `5000` → container `5000`
  - Environment variable set by compose: `MONGO_URI=mongodb://mongo:27017/apartments`
- Frontend: host `3000` → container `3000`

Notes:
- The compose file sets `MONGO_URI` so the backend will connect to the Mongo service by Docker network name `mongo`.
- If you prefer to run backend or frontend outside of Docker, update `NEXT_PUBLIC_API_URL` in the frontend `.env.local` to point at your backend host.

---

## Seeding and Swagger / API docs

- The backend includes a `seedIfEmpty()` helper in the `ApartmentsService` that can populate sample apartments and example images. See `apartments-api/README.md` and `src/apartments/apartments.service.ts` for details and how to invoke the seeder.
- Swagger / OpenAPI: the backend can expose a live interactive API UI when Swagger is registered in `src/main.ts`. By convention the project uses the path `/api` for Swagger, so the UI is typically available at:

  - `http://localhost:5000/api`

  If you do not see the Swagger UI, enable the snippet shown in `apartments-api/README.md` (or add the following to `main.ts`):

```ts
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const config = new DocumentBuilder()
  .setTitle('Apartments API')
  .setDescription('API for apartment listings with images, filtering and pagination')
  .setVersion('1.0')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);
```

See `apartments-api/README.md` for additional examples and API details.

---

## Useful commands

From repository root (PowerShell):

```powershell
# Build & start in background
docker compose up --build -d

# Show running containers
docker ps

# Stop and remove containers (but keep volumes)
docker compose down

# Remove containers and volumes
docker compose down -v

# View logs
docker compose logs -f

# Rebuild one service (example: backend)
docker compose build backend
docker compose up -d backend
```

If you prefer the legacy binary, replace `docker compose` with `docker-compose`.

---


## Where to find more documentation

- Frontend documentation: `apartments-app/README.md` (contains setup, architecture, components, theming and usage guide).
- Backend documentation and API reference: `apartments-api/README.md` (contains install, API endpoints, examples, seeding, and Swagger instructions).

Open those files for deeper information about each service.

