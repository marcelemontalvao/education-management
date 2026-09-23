# Education Management

Full-stack school management application used for the developer assessment. It
includes a Node.js/Express API, a React frontend, PostgreSQL seed scripts, and
student management CRUD operations.

## Project structure

```text
technical-assessment/
├── backend/       # Node.js API and React frontend
├── seed_db/       # PostgreSQL schema and seed data
└── Readme.md      # Complete assessment description
```

## Requirements

- Node.js 16 or newer
- npm
- PostgreSQL 12 or newer

## Run locally

```bash
cd technical-assessment/backend
npm install
npm run dev
```

The application starts at:

- Frontend: http://localhost:5173
- API: http://localhost:5007

The backend creates `.env` files from the provided examples when they do not
exist. Configure `DATABASE_URL` and the remaining secrets before starting the
application. Never commit `.env` files or credentials.

## Database setup

From `technical-assessment/`, initialize a local PostgreSQL database:

```bash
createdb school_mgmt
psql -d school_mgmt -f seed_db/tables.sql
psql -d school_mgmt -f seed_db/seed-db.sql
```

For Neon, run the same SQL files in the Neon SQL Editor or configure
`DATABASE_URL` with the connection string supplied by Neon.

## Student CRUD API

After logging in, the API uses secure cookies and the `x-csrf-token` header:

```text
GET    /api/v1/students
POST   /api/v1/students
GET    /api/v1/students/:id
PUT    /api/v1/students/:id
DELETE /api/v1/students/:id
```

See [`technical-assessment/Readme.md`](technical-assessment/Readme.md) for the
full challenge requirements and [`technical-assessment/backend/README.md`](technical-assessment/backend/README.md)
for backend details.
