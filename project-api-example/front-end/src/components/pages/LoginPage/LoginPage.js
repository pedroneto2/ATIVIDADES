import './LoginPage.css';
import { Form, Button, Spinner } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useNavigate, Link } from 'react-router-dom';
import * as yup from 'yup';

import PublicTemplate from 'components/templates/PublicTemplate';
import { useContext } from 'react';
import AuthContext from 'store/contexts/AuthContext';

const loginSchema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(6).max(150),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const { handleLogin } = useContext(AuthContext);

  const {
    values,
    touched,
    errors,
    status,
    handleChange,
    handleBlur,
    handleSubmit,
    setErrors,
    setStatus,
  } = useFormik({
    initialStatus: false,
    initialValues: { email: '', password: '' },
    validationSchema: loginSchema,
    onSubmit: async (formData) => {
      try {
        setStatus(true);
        await handleLogin(formData);
        navigate('/my-projects');
      } catch (error) {
        setErrors({
          email: error.response.data.message,
          password: error.response.data.message,
        });
        setStatus(false);
      }
    },
  });

  return (
    <PublicTemplate>
      <div className="login-page-container">
        <h2>Iron Projects Manager</h2>
        <p>Login into your account</p>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter your email"
              size="lg"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              isValid={touched.email && !errors.email}
              isInvalid={touched.email && errors.email}
            />
            <Form.Control.Feedback>Ok!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              size="lg"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              isValid={touched.password && !errors.password}
              isInvalid={touched.password && errors.password}
            />
            <Form.Control.Feedback>Ok!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit" size="lg" disabled={status}>
            {status ? <Spinner animation="border" variant="light" /> : 'Login'}
          </Button>
          <div className="register-link-container">
            <Link to="/register">Create a new account</Link>
          </div>
        </Form>
      </div>
    </PublicTemplate>
  );
};

export default LoginPage;
