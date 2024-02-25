import Task from '../models/Task.js';
import moment from 'moment';

// Controller for creating a new task
export const createTask = async (req, res) => {
  try {   
    const { title, description, dueDate } = req.body;

    const newTask = new Task({ title, description, dueDate, user: req.user.id });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: error.message });
  }
};

// Controller for retrieving all tasks of a user
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller for updating a task
export const updateTask = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description,dueDate, completed } = req.body;
      
      // Update the task in the database
      const updatedTask = await Task.findByIdAndUpdate(id, { 
        title, 
        description, 
        dueDate,
        completed
      }, { new: true });
  
      // Check if the task was found and updated
      if (!updatedTask) {
        return res.status(404).json({ error: 'Task not found' });
      }
  
      // Send the updated task in the response
      res.status(200).json(updatedTask);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// Controller for deleting a task
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
