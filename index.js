const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB (replace 'your_database_url' with your actual MongoDB connection string)
mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Define the schema and model for tasks
const taskSchema = new mongoose.Schema({
  title: String,
  status: String,
});

const Task = mongoose.model('Task', taskSchema);

// API endpoints
app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post('/tasks', async (req, res) => {
  const { title, status } = req.body;
  const newTask = new Task({ title, status });
  await newTask.save();
  res.json(newTask);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
