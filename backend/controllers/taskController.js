const Task = require('../models/Task');

// In-memory storage fallback
let tasksDB = [];
let taskIdCounter = 1;

// Helper function to check if MongoDB is connected
const isMongoDBConnected = () => {
  try {
    return Task.collection && Task.collection.db && Task.collection.db.readyState === 1;
  } catch (err) {
    return false;
  }
};

// Create Task
exports.createTask = async (req, res) => {
  try {
    // Validate input
    if (!req.body.title || !req.body.title.trim()) {
      return res.status(400).json({ message: 'Title is required' });
    }

    if (isMongoDBConnected()) {
      // Use MongoDB
      const task = new Task(req.body);
      await task.save();
      res.status(201).json(task);
    } else {
      // Use in-memory storage
      const newTask = {
        _id: String(taskIdCounter++),
        title: req.body.title,
        description: req.body.description || '',
        status: req.body.status || 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      tasksDB.push(newTask);
      res.status(201).json(newTask);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    if (isMongoDBConnected()) {
      // Use MongoDB
      const tasks = await Task.find().sort({ createdAt: -1 });
      res.json(tasks);
    } else {
      // Use in-memory storage
      res.json(tasksDB.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single task
exports.getTask = async (req, res) => {
  try {
    if (isMongoDBConnected()) {
      // Use MongoDB
      const task = await Task.findById(req.params.id);
      if (!task) return res.status(404).json({ message: 'Task not found' });
      res.json(task);
    } else {
      // Use in-memory storage
      const task = tasksDB.find(t => t._id === req.params.id);
      if (!task) return res.status(404).json({ message: 'Task not found' });
      res.json(task);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update task
exports.updateTask = async (req, res) => {
  try {
    if (isMongoDBConnected()) {
      // Use MongoDB
      const task = await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!task) return res.status(404).json({ message: 'Task not found' });
      res.json(task);
    } else {
      // Use in-memory storage
      const taskIndex = tasksDB.findIndex(t => t._id === req.params.id);
      if (taskIndex === -1) return res.status(404).json({ message: 'Task not found' });
      
      tasksDB[taskIndex] = {
        ...tasksDB[taskIndex],
        ...req.body,
        _id: tasksDB[taskIndex]._id,
        createdAt: tasksDB[taskIndex].createdAt,
        updatedAt: new Date(),
      };
      res.json(tasksDB[taskIndex]);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    if (isMongoDBConnected()) {
      // Use MongoDB
      const task = await Task.findByIdAndDelete(req.params.id);
      if (!task) return res.status(404).json({ message: 'Task not found' });
      res.json({ message: 'Task deleted successfully' });
    } else {
      // Use in-memory storage
      const taskIndex = tasksDB.findIndex(t => t._id === req.params.id);
      if (taskIndex === -1) return res.status(404).json({ message: 'Task not found' });
      
      tasksDB.splice(taskIndex, 1);
      res.json({ message: 'Task deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
