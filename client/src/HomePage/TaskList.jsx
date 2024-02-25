import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import UpdateTaskForm from './UpateTaskForm';

const TaskList = () => {
    const token = useSelector((state) => state.auth.token);
    const [tasks, setTasks] = useState([]);
    const [selectedTaskId, setSelectedTaskId] = useState(null); 

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch('http://localhost:5000/task/get-tasks', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                });
                
                if (response.ok) {
                    const data = await response.json();
                    // Format the due date for each task
                    const formattedTasks = data.map(task => ({
                        ...task,
                        dueDate: new Date(task.dueDate).toLocaleDateString('en-GB') // Format as dd/mm/yyyy
                    }));
                    setTasks(formattedTasks);
                } else {
                    console.error('Failed to fetch tasks');
                }
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, [token]);

    const handleEditClick = (taskId) => {
        // Set the selected taskId when edit button is clicked
        setSelectedTaskId(taskId);
    };

    const handleDeleteClick = async (taskId) => {
        try {
            const url = `http://localhost:5000/task/delete-task/${taskId}`;

            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.ok) {
                // Remove the deleted task from the local state
                setTasks(tasks.filter(task => task._id !== taskId));
            } else {
                console.error('Failed to delete task');
            }
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <div className="task-list">
            <h2 className="task-list-title">Task List</h2>
            <ul className="list-group">
                {tasks.map(task => (
                    <li key={task._id} className="list-group-item">
                        <div className="task-title">Title: {task.title}</div>
                        <div className="task-description">Description: {task.description}</div>
                        <div className="task-due-date">Due Date: {task.dueDate}</div>
                        <div className="task-actions">
                            <button onClick={() => handleEditClick(task._id)}>
                                <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button onClick={() => handleDeleteClick(task._id)}>
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            {/* Render UpdateTaskForm component only if a task is selected */}
            {selectedTaskId && <UpdateTaskForm taskId={selectedTaskId} />}
        </div>
    );
};

export default TaskList;
