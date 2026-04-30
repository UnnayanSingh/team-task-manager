# 🚀 Team Task Manager (Full-Stack)

A full-stack web application where users can create projects, assign tasks, and track progress with role-based access control (Admin / Member).

---

## 📌 Features

### 🔐 Authentication
- User Signup & Login (JWT based)
- Protected routes
- Persistent login (localStorage)

### 📁 Project Management
- Create projects
- View all projects
- Add members to projects

### 👥 Team Management
- Role-based access:
  - Admin → manage members & tasks
  - Member → view & update tasks

### ✅ Task Management
- Create tasks (Admin only)
- Assign tasks to members
- Update task status (Completed / Pending)
- View assigned user

### 📊 Dashboard
- Total tasks
- Completed tasks
- Pending tasks

---

## ⚙️ Tech Stack

### Frontend
- React (Vite)
- React Router DOM
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcrypt (password hashing)

---

## 🏗️ Project Structure

---

## 🔐 Role-Based Access Control (RBAC)

| Feature             | Admin | Member |
|--------------------|-------|--------|
| Create Project     | ✅    | ❌     |
| Add Members        | ✅    | ❌     |
| Create Task        | ✅    | ❌     |
| Assign Task        | ✅    | ❌     |
| Update Task Status | ✅    | ✅     |

---

## 🛠️ Installation

### 1. Clone Repository
git clone https://github.com/UnnayanSingh/team-task-manager.git
cd team-task-manager

---

### 2. Backend Setup
cd server
npm install

Create `.env` file inside `server/`:
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret

Run backend:
npm start

---

### 3. Frontend Setup
cd client
npm install
npm run dev

---

## 🧠 Future Improvements
- Add toast notifications
- Email-based user search UI
- Task deadlines & reminders
- Charts in dashboard
- Dark mode

---

## 👨‍💻 Author
Unnayan Singh  
BTech CSE (Cybersecurity)

---

## 📄 License
This project is for educational purposes.
