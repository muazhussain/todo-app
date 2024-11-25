# Todo Application

A microservices-based todo application built with NestJS and Redis.

## Architecture

- **todo-api**: REST API gateway (Port 3000)
- **todo-service**: Backend service with Redis storage (Port 3001)
- **Redis**: Data storage

## Prerequisites

- Node.js 18+
- Docker & Docker Compose
- Redis

## Quick Start

```bash
# Clone repository
git clone https://github.com/yourusername/todo-app.git

# Install dependencies
cd todo-app
cd todo-api && npm install
cd ../todo-service && npm install

# Set up environment files
cp todo-api/.env.example todo-api/.env.development
cp todo-service/.env.example todo-service/.env.development

# Run with Docker
docker-compose up
```

## Development

```bash
# Run API
cd todo-api
npm run start:dev

# Run Service
cd todo-service
npm run start:dev
```

## API Endpoints

- `POST /todos` - Create todo
- `GET /todos` - List todos
- `GET /todos/:id` - Get todo
- `PATCH /todos/:id` - Update todo
- `DELETE /todos/:id` - Delete todo

## Environment Variables

### Todo API
- `PORT`: API port (default: 3000)
- `TODO_SERVICE_URL`: Todo service URL

### Todo Service
- `PORT`: Service port (default: 3001)
- `REDIS_URL`: Redis connection URL

## Docker Deployment

```bash
docker-compose up -d
```

## CI/CD

GitHub Actions automatically build and push Docker images to Docker Hub on pushes to the production branch.

Required secrets:
- `DOCKERHUB_USERNAME`
- `DOCKERHUB_TOKEN`