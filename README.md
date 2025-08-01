# 📦 NestJS Monolithic App – Auth, Documents, Ingestion (Python)

A full-featured, production-grade monolithic NestJS backend that includes:

- ✅ JWT Authentication (Register/Login)
- 📄 Document Management (Upload, Download, List)
- 🔁 Ingestion Trigger to Python backend using Axios
- ⚙️ Modular structure with reusable services
- 📄 Swagger API Documentation
- 🧪 Unit testing with Jest
- 🧪 Faker-based seed script

---

## 📁 Folder Structure

```
src/
├── auth/                  # Register/Login & AuthService
├── users/                 # User entity
├── movies/                # Upload, Download APIs
├── common/
│   ├── axios/             # backend.client.ts (Axios pre-configured)
│   └── decorators/        # roles.decorator.ts (Role meta data for Role Guard)
│   └── entities/          # base.dto.ts (Base Entity Dto)
│   |                      # base.entity.ts (Base Entity)
│   └── filters/           # http-exception.filter.ts (Globle exception handler)
│   └── interceptors/      # file.interceptor.ts (File interceptor for handling file upload)
│   └── utils/             # generic-response.ts. (Generic response for client site)
                           # reponse-wrapper.ts. (Generic response wrapper)
```

---

## 🧩 Key Packages Used

| Package            | Purpose                               |
| ------------------ | ------------------------------------- |
| `@nestjs/passport` | Integrates Passport.js with NestJS    |
| `passport-jwt`     | Handles JWT-based authentication      |
| `@nestjs/typeorm`  | ORM integration for NestJS            |
| `axios`            | Makes HTTP requests to Python service |
| `@nestjs/swagger`  | Auto-generates Swagger API docs       |
| `class-validator`  | Validates DTOs (input schemas)        |

## 🚀 Setup & Run

### 1. Install Dependencies

```bash
git clone <repo-url>
```

```bash
cd client
```

```bash
npm install
```

```bash
cd server
```

```bash
npm install
```

## 2. Environment Configuration

Create a file named .env.dev for development as per env.example file in server

Create a file named .env for client as per env.example file in client

### 3. Start the Application

server

```bash
npm run start:dev
```

client

```bash
npm run dev
```

App runs on: `http://localhost:3000`

---

## 🔐 Auth APIs

### Register

```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "email@example.com",
  "password": "123456"
}
```

### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "email@example.com",
  "password": "123456"
}
```

Response:

```json
{
  "status": 1,
  "message": "Login successful",
  "data": {
    "access_token": "Token"
  }
}
```

---

## 📄 Swagger Documentation

Access Swagger UI at:

```
http://localhost:3000/api/auth/swagger
```

Provides full API documentation using `@nestjs/swagger`.

---

## 🧱 Deployment Ready

- All modules are separated
- Axios instance is reusable and centralized
- Can be containerized using Docker
- Ready to be split into microservices

---

## 👨‍💻 Author

**Manoj Kumar**
