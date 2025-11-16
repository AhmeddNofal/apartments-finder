<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

"""
Apartments API
"""

Comprehensive REST API for managing apartment listings and images. Built with NestJS and Mongoose, this service supports CRUD operations, image storage via MongoDB GridFS, advanced filtering, range queries, search across fields, and pagination.

---

## Table of Contents

- Project Overview
- Features
- Tech Stack
- Repository Structure
- Prerequisites
- Environment Variables
- Installation & Local Development
- Running (dev / production)
- API Reference
  - Endpoints (CRUD)
  - File Upload / Download
  - Filtering, Search & Pagination
  - Example Requests (curl)
- Data Model
- Seed Data
- Testing
- Deployment Notes
- Troubleshooting
- Contributing
- License

---

## Project Overview

This API manages apartment listings and associated images. Apartments include fields such as `unitName`, `unitNo`, `bedrooms`, `baths`, `unitArea`, `price`, `address`, `description`, and a list of `images` referencing files stored in MongoDB GridFS.

The API is intended to be consumed by a frontend application (for example, the `apartments-app` project in the workspace).

## Features

- CRUD for apartment resources
- Image uploads stored in MongoDB GridFS
- Download images by file id
- Flexible filtering on all meaningful fields
- Price and area range queries
- Search across `unitName` and `address` (case-insensitive)
- Pagination with metadata (total/totalPages/page/limit)
- DTO validation using `class-validator` and `class-transformer`
- Swagger-ready controller decorators for API documentation

## Tech Stack

- Node.js (>= 16 recommended)
- NestJS
- TypeScript
- Mongoose / MongoDB
- MongoDB GridFS for file storage
- class-validator + class-transformer for DTO validation

## Repository Structure (important files)

- `src/app.module.ts` — Application entry / Mongoose connection
- `src/apartments/` — Apartments feature
  - `apartments.module.ts` — module registration (Mongoose model injection)
  - `apartments.controller.ts` — REST endpoints (CRUD + file download)
  - `apartments.service.ts` — Business logic, GridFS upload/download, filtering
  - `schemas/apartment.schema.ts` — Mongoose schema
  - `dto/` — DTOs: `create`, `update`, `query`
- `src/grid-fs/` — GridFS helper service (bucket initialization)


## Prerequisites

- MongoDB server (local or remote) accessible via a connection URI
- Node.js and npm installed

## Environment Variables

Create a `.env` file or set environment variables in your environment. The following are used by the project:

- `MONGO_URI` — MongoDB connection string. Defaults to `mongodb://localhost:27017/apartments` if not set.
- `PORT` — (optional) server port for NestJS (default 3000 if using Nest's default bootstrap).

Example `.env`:

```
MONGO_URI=mongodb://localhost:27017/apartments
PORT=3000
```

## Installation & Local Development

1. Install dependencies

```bash
cd apartments-api
npm install
```

2. Run the development server

```bash
npm run start:dev
```

This will launch the NestJS application. By default it connects to the MongoDB URI in `MONGO_URI` or the local fallback.

## Running (production)

Build and start:

```bash
npm run build
NODE_ENV=production npm run start:prod
```

Adjust environment variables and process manager as needed (PM2, Docker, systemd, etc.).

## API Reference

Base path: `/apartments`

All endpoints return JSON unless otherwise noted.

### Create apartment (with optional images)

- Method: `POST`
- Path: `/apartments`
- Content-Type: `multipart/form-data` (for images)
- Body fields (example): `unitName`, `unitNo`, `bedrooms`, `baths`, `unitArea`, `price`, `address`, `description` and any number of files as `files`.

Response: `201 Created` with the created apartment document.

Example (curl):

```bash
curl -X POST "http://localhost:3000/apartments" \
  -F 'unitName=Sea View Apartment' \
  -F 'unitNo=301' \
  -F 'bedrooms=3' \
  -F 'baths=2' \
  -F 'unitArea=120' \
  -F 'price=250000' \
  -F 'address=12 Nile Street, Cairo' \
  -F 'description=A beautiful apartment with a view of the sea.' \
  -F "files=@/path/to/image1.jpg" \
  -F "files=@/path/to/image2.jpg"
```

Notes:
- Each uploaded file is stored in GridFS and the returned apartment document will contain `images` as an array of file IDs (strings).

### Get apartments (filter/search/pagination)

- Method: `GET`
- Path: `/apartments`
- Query parameters:
  - `page` (number, default 1)
  - `limit` (number, default 10)
  - `search` (string) — searches `unitName` and `address` (case-insensitive)
  - `minPrice`, `maxPrice` (numbers) — price range
  - `minArea`, `maxArea` (numbers) — unit area range
  - `bedrooms` (number) — exact match
  - `baths` (number) — exact match
  - `unitNo` (number) — exact match

Response: `200 OK` with JSON containing `{ data: [...], total, page, limit, totalPages }`.

Example:

```bash
curl "http://localhost:3000/apartments?search=sea&minPrice=100000&maxPrice=300000&page=1&limit=10"
```

### Get apartment by ID

- Method: `GET`
- Path: `/apartments/:id`

Response: `200 OK` with apartment document or `404 Not Found` if missing.

### Update apartment (with optional images)

- Method: `PATCH`
- Path: `/apartments/:id`
- Content-Type: `multipart/form-data` if uploading files
- Body: partial apartment fields (same keys as create) and `files[]` for additional images.

Behavior:
- Fields provided in the body will overwrite existing values.
- Uploaded images are stored in GridFS and appended to the apartment's `images` array.

Example (curl):

```bash
curl -X PATCH "http://localhost:3000/apartments/654d2a1234567890abcdef12" \
  -F 'bedrooms=4' \
  -F 'price=300000' \
  -F "files=@/path/to/new-image.jpg"
```

### Delete apartment

- Method: `DELETE`
- Path: `/apartments/:id`
- Response: `200 OK` with a success message, or `404 Not Found` if the apartment doesn't exist.


### Download image by file ID

- Method: `GET`
- Path: `/apartments/file/:id`
- Response: Binary stream of the file (GridFS). Returns `404 Not Found` if the file id is invalid or missing.

Example:

```bash
curl "http://localhost:3000/apartments/file/655a9c1234567890abcdef34" --output apartment-image.jpg
```

## Data Model

Primary document: `Apartment`

Fields:
- `unitName` (string, required)
- `unitNo` (number, required)
- `bedrooms` (number, required)
- `baths` (number, required)
- `unitArea` (number, required)
- `price` (number, required)
- `address` (string, required)
- `description` (string, required)
- `images` (string[]) — file IDs stored in GridFS

Indexes:
- `price` (asc)
- `bedrooms` (asc)
- Compound index on `{ price, bedrooms, baths, unitArea }`

## Seed Data

There is a helper method `seedIfEmpty()` inside the `ApartmentsService` that will populate the database with example apartments if none exist. The service reads two image files from `assets/` and uploads them to GridFS. To use the seeder you can call it from the application bootstrap or a one-off script.

Example (quick script inside `main.ts` bootstrap):

```ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const apartmentsService = app.get(ApartmentsService);
  await apartmentsService.seedIfEmpty();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
```

If you use the seeder, ensure `assets/apartment1.jpg` and `assets/apartment2.jpg` exist in the project root (or update the paths accordingly).

## Testing

- Unit / e2e tests are not included by default in this repository snapshot. Add tests under `test/` and use Nest's `TestingModule` helpers for unit/e2e tests.
- For basic manual testing use `curl` or Postman to exercise the endpoints described above.

## Swagger / API Docs

The controllers are annotated with Swagger decorators (`@ApiTags`, `@ApiOperation`, etc.). If you want a live OpenAPI UI, register Swagger in `main.ts`:

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

After adding the above and starting the server, visit `http://localhost:3000/api` to see interactive docs.

