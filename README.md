# Project Documentation

## Project Structure

This project consists of a full-stack application with a Node.js/Express backend and a React frontend.
This project is a real time chat application with other users and with a ai chatbot

### Backend Structure

#### Controllers (`/backend/controllers/`)
- `ai.controller.js` - Handles AI-related operations
- `project.controller.js` - Manages project-related operations
- `user.controller.js` - Handles user authentication and management

#### Database (`/backend/db/`)
- `db.js` - Database connection configuration

#### Middleware (`/backend/middleware/`)
- `auth.middleware.js` - Authentication middleware for protecting routes

#### Models (`/backend/models/`)
- `project.models.js` - Project data model
- `user.model.js` - User data model

#### Routes (`/backend/routes/`)
- `ai.routes.js` - AI-related API endpoints
- `project.routes.js` - Project-related API endpoints
- `user.routes.js` - User-related API endpoints

#### Services (`/backend/services/`)
- `ai.service.js` - AI service implementation
- `project.service.js` - Project service implementation
- `user.service.js` - User service implementation
- `redis.service.js` - Redis caching service

### Frontend Structure (`/frontend/src/`)
- `auth/` - Authentication-related components
- `config/` - Configuration files
- `screens/` - Main application screens
- `context/` - React context providers
- `routes/` - Frontend routing configuration
- `assets/` - Static assets
- `App.jsx` - Main application component
- `main.jsx` - Application entry point

## Features

- Real-time communication using Socket.IO
- AI integration with @ai mentions in chat
- User authentication and authorization
- Project management system
- Redis caching support

## Setup Instructions

1. Install dependencies:
   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd frontend
   npm install
   ```

2. Configure environment variables:
   Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=3000
   JWT_SECRET=your_jwt_secret
   ```

3. Start the development servers:
   ```bash
   # Backend
   cd backend
   npm run dev

   # Frontend
   cd frontend
   npm run dev
   ```

## API Endpoints

### User Routes
- `/users` - User management endpoints

### Project Routes
- `/projects` - Project management endpoints

### AI Routes
- `/ai` - AI-related endpoints

## WebSocket Events

The application uses Socket.IO for real-time communication:

- `project-message` - Handle project chat messages
- `@ai` mentions trigger AI responses in the chat

## Authentication

The application uses JWT (JSON Web Tokens) for authentication. Protected routes require a valid JWT token in the Authorization header.

## Technologies Used

- Backend:
  - Node.js
  - Express.js
  - Socket.IO
  - MongoDB
  - Redis
  - JWT

- Frontend:
  - React
  - React Router
  - Context API

## Security

- CORS enabled
- JWT authentication
- Protected routes
- Secure cookie handling
