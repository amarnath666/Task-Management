import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const CreateTaskForm = () => {
    const token = useSelector((state) => state.auth.token);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        dueDate: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/task/create-task', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });
            console.log('Response:', response);
            if (response.ok) {
                const data = await response.json();
                console.log('Task created:', data);
                // Optionally, you can clear the form after successful submission
                setFormData({
                    title: '',
                    description: '',
                    dueDate: ''
                });
            } else {
                console.error('Failed to create task');
            }
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    return (
        <div className="create-task-form">
            <h2>Create New Task</h2>
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
                <button type="submit">Create Task</button>
            </form>
        </div>
    );
};

export default CreateTaskForm;
