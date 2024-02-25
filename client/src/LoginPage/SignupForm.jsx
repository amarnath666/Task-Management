import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';

const SignupForm = () => {
  const navigate = useNavigate();

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleLoginClick = () => {
    navigate('/');
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log("Request Payload:", JSON.stringify(values));
    try {
      const response = await fetch("http://localhost:5000/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        navigate("/");
        console.log('Signup successful');
      } else {
        // Handle error
        console.error('Signup failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }

    setSubmitting(false);
  };

  return (
    <div className="login-page">
      <div className="login-container">
      <h2>Sign Up</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="signup-form">
            <div className="form-group">
              <Field type="text" name="firstName" placeholder="First Name" />
              <ErrorMessage name="firstName" component="div" className="error" />
            </div>
            <div className="form-group">
              <Field type="text" name="lastName" placeholder="Last Name" />
              <ErrorMessage name="lastName" component="div" className="error" />
            </div>
            <div className="form-group">
              <Field type="email" name="email" placeholder="Email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div className="form-group">
              <Field type="password" name="password" placeholder="Password" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Signing up...' : 'Sign Up'}
            </button>
          </Form>
        )}
      </Formik>
      <p>
        {' '}
        <Link to="/" onClick={handleLoginClick}>
          Already have an account? Login here.
        </Link>
      </p>
      </div>
    </div>
  );
};

export default SignupForm;
