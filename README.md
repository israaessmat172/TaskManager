# Task Management System

This is a Task Management API built with Node.js and Express.js. The API allows users to register, log in, and manage tasks. Each user has their own tasks, which they can create, update, delete, and mark as completed.

## Features

- **User Authentication**: Users can register and log in with email and password. The API uses `bcrypt` for password hashing and `jsonwebtoken` (JWT) for authentication.
- **CRUD Operations on Tasks**: Users can create, read, update, and delete tasks. Each task is linked to the user who created it.
- **Task Completion**: Users can mark tasks as completed.
- **Protected Routes**: Task routes are protected by JWT authentication.

## Tech Stack

- Node.js
- Express.js
- MongoDB (with Mongoose)
- bcrypt for password hashing
- JWT for authentication

## Prerequisites

- Node.js installed on your machine.
- MongoDB installed or access to MongoDB Atlas.
- Postman or similar tool for testing the API.

## Getting Started

1. Clone the repository:

    ```bash
    https://github.com/israaessmat172/TaskManager.git
    cd TaskManager
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables:

   Create a `.env` file in the root directory and add the following:

    ```env
    PORT=8000
    MONGO_URI=your_mongodb_uri
    JWT_SECRET_KEY=your_jwt_secret_key
    ```

4. Start the server:

    ```bash
    npm run server
    ```

   The server will start on the specified port (default: `8000`).

## API Endpoints

### User Routes

| Method | Endpoint          | Description          |
|--------|-------------------|----------------------|
| GET    | `/api/users`       | Test user route      |
| POST   | `/api/users/register` | Register a new user |
| POST   | `/api/users/login`    | Log in a user       |

#### Register User

- **URL**: `/api/users/register`
- **Method**: `POST`
- **Body Parameters**:
    - `name`: User's name
    - `email`: User's email
    - `password`: User's password

#### Log in User

- **URL**: `/api/users/login`
- **Method**: `POST`
- **Body Parameters**:
    - `email`: User's email
    - `password`: User's password

### Task Routes (Protected)

| Method | Endpoint                 | Description                  |
|--------|--------------------------|------------------------------|
| GET    | `/api/tasks/test`         | Test task route (auth)        |
| POST   | `/api/tasks/add/task`     | Add a new task                |
| GET    | `/api/tasks/user/tasks`   | Get all tasks for a user      |
| GET    | `/api/tasks/:id`          | Get a specific task by ID     |
| PUT    | `/api/tasks/:id`          | Update a task by ID           |
| PUT    | `/api/tasks/:id/finish`   | Mark a task as completed      |
| DELETE | `/api/tasks/:id`          | Delete a task by ID           |

#### Add Task

- **URL**: `/api/tasks/add/task`
- **Method**: `POST`
- **Body Parameters**:
    - `description`: Task description
    - `completed`: (Optional) Task completion status (default: `false`)

#### Mark Task as Completed

- **URL**: `/api/tasks/:id/finish`
- **Method**: `PUT`

## Authentication Middleware

The `auth` middleware is used to protect routes that require the user to be logged in. It verifies the JWT token sent in the request header.

## Testing with Postman

You can use Postman or similar tools to test the API. Make sure to include the `Authorization` header with the value `Bearer <token>` for protected routes.
