import express from 'express';
import { createTask, getTasks, updateTask, deleteTask } from '../controllers/task.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Routes for tasks
router.post('/create-task', verifyToken, createTask); // Create a new task
router.get('/get-tasks', verifyToken, getTasks);    // Get all tasks of a user
router.put('/update-task/:id', verifyToken, updateTask); // Update a task
router.delete('/delete-task/:id', verifyToken, deleteTask); // Delete a task

export default router;
