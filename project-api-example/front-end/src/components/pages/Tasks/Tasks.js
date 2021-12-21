/* eslint-disable no-underscore-dangle */
import { getTasks } from 'api/api';
import { useEffect, useState } from 'react';
import { Spinner, Toast, ToastContainer } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

import PrivateTemplate from 'components/templates/PrivateTemplate';
import DeleteModal from 'components/utils/Modals/DeleteModal';

import './Tasks.css';

const retrieveTasks = async (projectID, setTasks, setLoading, navigate, search) => {
  try {
    const token = localStorage.getItem('token');
    const tasks = await getTasks(token, projectID, search);
    setTasks(tasks);
    setLoading(false);
  } catch (error) {
    navigate('/my-projects', { replace: true });
  }
};

const handleChange = (e, setSearch) => {
  setSearch(e.target.value);
};

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [error, setError] = useState({ status: false, message: '' });
  const [modalShow, setModalShow] = useState({ open: false, id: '' });

  const params = useParams();
  const navigate = useNavigate();

  const projectID = params.id;

  useEffect(async () => {
    await retrieveTasks(projectID, setTasks, setLoading, navigate, search);
  }, [search]);
  return (
    <PrivateTemplate projectID={projectID}>
      {loading ? (
        <Spinner animation="border" variant="dark" />
      ) : (
        <div className="tasks-page-container">
          <input
            className="search-bar"
            name="search"
            placeholder="search by title"
            value={search.string}
            onChange={(e) => handleChange(e, setSearch)}
          />
          <div className="tasks-container">
            {tasks.length ? (
              tasks.map((task) => (
                <div key={task._id} className="single-task-container">
                  <div className="task-card">
                    <h4>{task.title}</h4>
                    <p>{task.description}</p>
                  </div>
                  <button type="button" onClick={() => setModalShow({ open: true, id: task._id })}>
                    <i className="bi bi-trash-fill" />
                  </button>
                </div>
              ))
            ) : (
              <h4>Este projeto não possui tarefas!</h4>
            )}
          </div>
        </div>
      )}
      <ToastContainer className="p-3" position="top-end">
        <Toast
          show={error.status}
          onClose={() => setError({ ...error, status: false })}
          autohide
          delay={3000}
          className="d-inline-block m-1"
          bg="danger"
        >
          <Toast.Body className="text-white">{error.message}</Toast.Body>
        </Toast>
      </ToastContainer>
      <DeleteModal
        type="task"
        modalShow={modalShow.open}
        setModalShow={setModalShow}
        setError={setError}
        ID={modalShow.id}
        items={tasks}
        setItems={setTasks}
        retrieveItems={retrieveTasks}
        projectID={projectID}
        setLoading={setLoading}
      />
    </PrivateTemplate>
  );
};

export default Tasks;
