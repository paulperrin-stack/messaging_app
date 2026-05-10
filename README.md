# Messaging App

REST API for direct messaging between users. Built as a Node.js project for The Odin Project.

## Stack

**Backend:** Node.js · Express 5 · Prisma · PostgreSQL · JWT · Passport.js · bcrypt  
**Frontend:** React 19 · Vite (not deployed — run locally)

## Structure

messaging-app/
├── backend/    # Express REST API
└── frontend/   # React client

## API Endpoints

### Auth

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | /api/auth/register | — | Create account |
| POST | /api/auth/login | — | Returns JWT token |

### Users
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | /api/users | Required | List all users |
| GET | /api/users/:id | Required | Get user profile |
| PUT | /api/users/:id | Required (own) | Update profile |

### Messages
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | /api/messages/:userId | Required | Get conversation |
| POST | /api/messages/:userId | Required | Send message |

## Run locally

```bash
git clone https://github.com/paulperrin-stack/messaging-app
cd messaging-app/backend
cp .env.example .env   # add DATABASE_URL and JWT_SECRET
npm install
npx prisma generate
npx prisma migrate dev
node src/app.js
```
In a second terminal:
```bash
cd messaging-app/frontend
cp .env.example .env   # add VITE_API_URL=http://localhost:3000/api
npm install
npm run dev
```