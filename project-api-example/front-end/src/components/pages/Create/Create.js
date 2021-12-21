/* eslint-disable no-param-reassign */
import { Form, Button, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { createProject, createTask } from 'api/api';
import { useFormik } from 'formik';
import * as yup from 'yup';

import PrivateTemplate from 'components/templates/PrivateTemplate';

import './Create.css';

const projectSchema = yup.object().shape({
  title: yup.string().required().min(6).max(50),
  description: yup.string().required().min(15).max(150),
});

const CreateProject = () => {
  const navigate = useNavigate();
  const projectID = useParams().id;
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
    initialValues: { title: '', description: '' },
    validationSchema: projectSchema,
    onSubmit: async (formData) => {
      try {
        setStatus(true);
        const create = projectID ? createTask : createProject;
        if (projectID) {
          formData.project = projectID;
        }
        const token = localStorage.getItem('token');
        await create(token, formData);
        const projectLink = projectID ? `/${projectID}` : '';
        navigate(`/my-projects${projectLink}`);
      } catch (error) {
        setErrors({
          title: error.response.data.message,
          description: error.response.data.message,
        });
        setStatus(false);
      }
    },
  });
  return (
    <PrivateTemplate>
      <div className="create-project-container">
        <h3>{`Create New ${projectID ? 'Task' : 'Project'}`}</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="Enter the title"
              size="lg"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              isValid={touched.title && !errors.title}
              isInvalid={touched.title && errors.title}
            />
            <Form.Control.Feedback>Ok!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              placeholder="description"
              size="lg"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              isValid={touched.description && !errors.description}
              isInvalid={touched.description && errors.description}
            />
            <Form.Control.Feedback>Ok!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit" size="lg" disabled={status}>
            {status ? <Spinner animation="border" variant="light" /> : 'Create'}
          </Button>
        </Form>
      </div>
    </PrivateTemplate>
  );
};

export default CreateProject;
