import React from 'react';
import CreateTaskForm from './CreateTaskForm';
import TaskList from './TaskList';
import Navbar from './Navbar';

const HomePage = () => {
    return (
        <div className="home-page">
            <Navbar />
            <div className="container">
                <div className="row">
                <div className="col-md-6">
                        <CreateTaskForm />
                    </div>
                    <div className="col-md-6">
                        <TaskList />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
