MERN AI Task Manager

A simple and practical Task Manager application built using the MERN Stack, with an AI-powered task generation feature using Google Gemini.

This app helps users manage their daily tasks and also allows them to generate sub-tasks automatically with the help of AI.

Features

User registration and login using JWT authentication

Create, view, update, and delete tasks

AI-powered task generation using Google Gemini

Mark tasks as completed or pending

User-specific tasks (data is private and secure)

Clean and modern dark UI

AI Task Generator

Users can enter a task title and let AI generate sub-tasks automatically.

Example:

Task: Learn MERN Stack

AI generates:

- Learn MongoDB basics
- Understand Express and APIs
- Practice React fundamentals
- Learn Node.js concepts
- Build a small project

Tech Stack
Frontend

React (Vite)

Fetch API

Custom CSS (Dark Theme)

Backend

Node.js

Express.js

MongoDB with Mongoose

JWT Authentication

AI

Google Gemini

SDK: @google/genai

Model: gemini-3-flash-preview

Project Structure
backend/
 └─ src/
    ├─ routes/
    │  ├─ taskRoutes.js
    │  ├─ userRoutes.js
    │  └─ aiRoutes.js
    ├─ middlewares/
    │  └─ authMiddleware.js
    ├─ app.js
    └─ server.js

frontend/
 └─ src/
    ├─ components/
    │  ├─ Login.jsx
    │  ├─ HomeApp.jsx
    │  └─ TaskForm.jsx
    ├─ App.jsx
    └─ App.css

Environment Variables

Create a .env file inside the backend folder:

PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key

How to Run the Project
Backend
cd backend
npm install
node --env-file=.env --watch src/server.js

Frontend
cd frontend
npm install
npm run dev


Authentication Flow

User registers or logs in

Backend generates a JWT token

Token is stored in browser localStorage

All protected routes use JWT middleware

Each user can access only their own tasks

Error Handling

Input validation on both frontend and backend

Proper error messages for authentication and API failures

AI errors are handled gracefully

Why This Project?

This project demonstrates:

Real-world MERN stack usage

Clean backend architecture

Secure authentication using JWT

Practical AI integration

Good separation of concerns

Perfect for portfolios, interviews, and learning full-stack development with AI.

Future Improvements

Refresh token implementation

AI response streaming

Rate limiting on AI routes

Better mobile responsiveness

UI animations and polish

Final Note

This is more than a basic CRUD app.
It combines MERN + AI to solve a real productivity problem in a clean and practical way.
