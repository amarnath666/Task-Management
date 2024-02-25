import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { setLogin } from '../state/authSlice';

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const initialValues = {
        email: "",
        password: "",
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Password is required'),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
        const response = await fetch("http://localhost:5000/auth/login", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        });

        if (response.ok) {
            const data = await response.json(); // Parse the JSON response
            dispatch(setLogin({ user: data.user, token: data.token }));
            navigate("/home");
        } else {
            console.error('Login failed');
        }
        } catch (error) {
        console.error('Error:', error);
        }

        setSubmitting(false);
    };

    return (
        <div>
        <h2>Login</h2>
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
            <Form className="login-form">
                <div className="form-group">
                <Field type="email" name="email" placeholder="Email" />
                <ErrorMessage name="email" component="div" className="error" />
                </div>
                <div className="form-group">
                <Field type="password" name="password" placeholder="Password" />
                <ErrorMessage name="password" component="div" className="error" />
                </div>
                <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Logging in...' : 'Login'}
                </button>
            </Form>
            )}
        </Formik>
        </div>
    );
    };

    export default LoginForm;