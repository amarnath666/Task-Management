import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <div className="login-page">
      <div className="login-container">
      <LoginForm />
      <p>       
        <Link to="/signup" onClick={handleSignupClick}>
          Don't have an account? Sign Up here.
        </Link>
      </p>
      </div>
    </div>
  );
};

export default LoginPage;

