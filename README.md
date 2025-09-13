🚀 MERN Project

A full-stack web application built with the MERN stack: MongoDB, Express.js, React, and Node.js.

📌 Features

🔐 User authentication (JWT)

🛠️ CRUD operations with MongoDB

🎨 Modern responsive UI with React + Tailwind CSS

📡 RESTful API with Express.js

⚡ State management (Context API)

📦 Deployment ready / Deployed (Vercel / Render)

📂 Folder Structure
FinanceTracker/
│── backend/          # Express + Node.js server
│   ├── models/       # Mongoose models
│   ├── routes/       # Express routes
│   ├── controllers/  # API controllers
│   ├── middlewaress/ # middleware function for auth
│   ├── config/       # DB & environment config
│   ├── .env          # Environment variables
│   ├── package.json  # Root package file (optional)
│   └── index.js      # Entry point for backend
│
│── frontend/           # React client
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # React pages
│   │   ├── context/    # Context/Redux state
│   │   └── App.jsx
│   └── package.json
│
│── README.md

⚙️ Installation & Setup
1. Clone the repository
git clone https://github.com/your-username/project-name.git
cd project-name

2. Install dependencies
Backend
cd backend
npm install

Frontend
cd frontend
npm install

3. Configure environment variables

Create a .env file inside backend/:
MONGODB = "mongodb+srv://swagattalukdar007_db_user:xfta8wn65t8LQqEK@cluster0.zlnn7dg.mongodb.net/finance-tracker"
JWT_SECRET = "000secretkey000"


🚀 Run the Application
Backend (Express + Node.js)
cd backend
npm run server

Frontend (React)
cd frontend
npm run dev


🛠️ Tech Stack

Frontend: React, Context API, Axios, Tailwind CSS

Backend: Node.js, Express.js

Database: MongoDB + Mongoose

Auth: JWT

Deployment: Vercel, Render, MongoDB Atlas
