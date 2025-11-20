# Task Manager - MERN Stack Application

A full-stack Task Manager application built with MongoDB, Express.js, React.js, and Node.js.

## 📋 Features

- ✅ Create new tasks with title, description, and status
- ✅ View all tasks in a clean, organized list
- ✅ Edit existing tasks
- ✅ Delete tasks
- ✅ Task status management (Pending, In Progress, Completed)
- ✅ Real-time updates with React Query
- ✅ Beautiful UI with Chakra UI
- ✅ Responsive design
- ✅ Input validation and error handling
- ✅ Toast notifications for user feedback

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **CORS** - Cross-Origin Resource Sharing
- **Dotenv** - Environment variables

### Frontend
- **React.js** - UI library
- **Vite** - Build tool
- **Chakra UI** - Component library
- **Axios** - HTTP client
- **React Query** - Data fetching and caching
- **Emotion** - CSS-in-JS library

## 📁 Project Structure

```
mern-task-manager/
├── backend/
│   ├── models/
│   │   └── Task.js
│   ├── controllers/
│   │   └── taskController.js
│   ├── routes/
│   │   └── taskRoutes.js
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── TaskList.jsx
    │   │   └── TaskForm.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── vite.config.js
    └── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/task-manager
```

4. Start the backend server:
```bash
npm run server
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## 📝 API Endpoints

### Tasks
- `POST /api/tasks` - Create a new task
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get a single task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## 🧪 Testing with Postman

### Create a Task
```
POST http://localhost:5000/api/tasks
Content-Type: application/json

{
  "title": "Learn MERN",
  "description": "Complete the MERN stack course",
  "status": "in-progress"
}
```

### Get All Tasks
```
GET http://localhost:5000/api/tasks
```

### Update a Task
```
PUT http://localhost:5000/api/tasks/{taskId}
Content-Type: application/json

{
  "title": "Learn MERN Stack",
  "status": "completed"
}
```

### Delete a Task
```
DELETE http://localhost:5000/api/tasks/{taskId}
```

## 📦 Available Scripts

### Backend
- `npm run server` - Start development server with nodemon
- `npm start` - Start production server

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🎨 UI Components

### TaskList
Displays all tasks with edit and delete options.

### TaskForm
Modal form for creating and editing tasks with validation.

## ✨ Key Features Explained

### Real-time Updates
Uses React Query to automatically refetch tasks every 5 seconds.

### Form Validation
- Title is required
- Error messages displayed via toast notifications

### Status Management
Tasks can have three statuses:
- **Pending** - New task (default)
- **In Progress** - Currently working on
- **Completed** - Task finished

## 🔧 Configuration

### MongoDB Connection
- Local: `mongodb://localhost:27017/task-manager`
- Atlas: Update `MONGODB_URI` in `.env` with your connection string

### CORS
Backend is configured to accept requests from `http://localhost:3000`

## 📚 Learning Resources

- [MERN Stack Documentation](https://www.mongodb.com/mern-stack)
- [Express.js Guide](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [Chakra UI Components](https://chakra-ui.com/)

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running locally or check your Atlas connection string
- Verify the `MONGODB_URI` in `.env`

### CORS Error
- Make sure backend is running on port 5000
- Check that frontend is making requests to `http://localhost:5000`

### Port Already in Use
- Backend: Change `PORT` in `.env`
- Frontend: Change port in `vite.config.js`

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Created as a MERN Stack learning project.

---

**Happy coding! 🚀**
