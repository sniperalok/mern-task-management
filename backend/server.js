require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/tasks', taskRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Task Manager API is running...');
});

// Database connection
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/task-manager', {
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => {
    console.warn('⚠️ MongoDB connection error:', err.message);
    console.log('💡 Using local storage fallback. Install MongoDB or use MongoDB Atlas.');
    console.log('📝 To use MongoDB Atlas:');
    console.log('   1. Create account at https://www.mongodb.com/cloud/atlas');
    console.log('   2. Get connection string');
    console.log('   3. Update MONGODB_URI in .env file');
  });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
