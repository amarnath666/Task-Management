import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UpdateTaskForm = ({ taskId }) => {
    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        dueDate: '',
        completed: false // Set as a boolean value
    });

    useEffect(() => {
        // Fetch task details based on taskId
        const fetchTaskDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/task/upate-task/${taskId}`);
                if (response.ok) {
                    const task = await response.json();
                    console.log('Fetched task details:', task);
                    setFormData({
                        ...task,
                        completed: task.completed 
                    });
                    navigate("/home");
                } else {
                    console.error('Failed to fetch task details');
                }
            } catch (error) {
                console.error('Error fetching task details:', error);
            }
        };

        fetchTaskDetails();
    }, [taskId, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'completed') {
            setFormData({ ...formData, [name]: value === 'true' });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Updating task with formData:', formData);
            const response = await fetch(`http://localhost:5000/task/update-task/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
            } else {
                console.error('Failed to update task');
            }
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    return (
        <div className="update-task-form">
            <h2>Update Task</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <div className="input-group">
                    <label htmlFor="dueDate">Due Date:</label>
                    <input
                        type="date"
                        id="dueDate"
                        name="dueDate"
                        value={formData.dueDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Completed:</label>
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="completed"
                                value="true"
                                checked={formData.completed === true}
                                onChange={handleChange}
                            /> True
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="completed"
                                value="false"
                                checked={formData.completed === false}
                                onChange={handleChange}
                            /> False
                        </label>
                    </div>
                </div>
                <button type="submit">Update Task</button>
            </form>
        </div>
    );
};

export default UpdateTaskForm;
