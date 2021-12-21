import { useFormik } from 'formik';
import { Form, Button, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { register } from 'api/api';
import * as yup from 'yup';

import PublicTemplate from 'components/templates/PublicTemplate';

import './Register.css';

const registerSchema = yup.object().shape({
  name: yup.string().required().min(3).max(150),
  email: yup.string().required().email(),
  password: yup.string().required().min(6).max(150),
  confirmPassword: yup
    .string()
    .required('You must confirm your password')
    .oneOf([yup.ref('password')], 'Password must match'),
});

const Register = () => {
  const navigate = useNavigate();
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
    initialValues: { name: '', email: '', password: '', confirmPassword: '' },
    validationSchema: registerSchema,
    onSubmit: async (formData) => {
      try {
        setStatus(true);
        await register(formData);
        navigate('/');
      } catch (error) {
        setErrors({
          email: error.response.data.message,
        });
        setStatus(false);
      }
    },
  });
  return (
    <PublicTemplate>
      <div className="register-page-container">
        <h2>Iron Projects Manager</h2>
        <p>Create your account</p>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              name="name"
              placeholder="Enter your name"
              size="lg"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              isValid={touched.name && !errors.name}
              isInvalid={touched.name && errors.name}
            />
            <Form.Control.Feedback>Ok!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
          </Form.Group>

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

          <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              size="lg"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              isValid={touched.confirmPassword && !errors.confirmPassword && !errors.password}
              isInvalid={touched.confirmPassword && (errors.confirmPassword || errors.password)}
            />
            <Form.Control.Feedback>Ok!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit" size="lg" disabled={status}>
            {status ? <Spinner animation="border" variant="light" /> : 'Create Account'}
          </Button>
          <div className="login-page-link-container">
            <Link to="/">Back to Login Page</Link>
          </div>
        </Form>
      </div>
    </PublicTemplate>
  );
};

export default Register;
