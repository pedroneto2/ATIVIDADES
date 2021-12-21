/* eslint-disable no-underscore-dangle */
import { Button, Spinner, Toast, ToastContainer } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Projects.css';

import { getProjects } from 'api/api';

import PrivateTemplate from 'components/templates/PrivateTemplate';
import DeleteModal from 'components/utils/Modals/DeleteModal';

const retrieveProjects = async (setProjects, setError, search) => {
  try {
    const token = localStorage.getItem('token');
    const projects = await getProjects(token, search);
    setProjects(projects);
  } catch (error) {
    setError({ status: true, message: error.response.data.message });
  }
};

const handleSearch = async (search, setSearch, setProjects, setError) => {
  setSearch({ ...search, loading: true });
  await retrieveProjects(setProjects, setError, search.string);
  setSearch({ ...search, loading: false });
};

const handleChange = (e, search, setSearch) => {
  setSearch({ ...search, string: e.target.value });
};

const Projects = () => {
  const [search, setSearch] = useState({ string: '', loading: false });
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({ status: false, message: '' });
  const [modalShow, setModalShow] = useState({ open: false, id: '' });

  useEffect(async () => {
    await retrieveProjects(setProjects, setError);
    setLoading(false);
  }, []);
  return (
    <PrivateTemplate>
      <div className="projects-page-container">
        <div className="search-container">
          <input
            className="search-bar"
            name="search"
            placeholder="search by title"
            value={search.string}
            onChange={(e) => handleChange(e, search, setSearch)}
          />
          <Button
            variant="primary"
            type="submit"
            size="lg"
            disabled={search.loading}
            onClick={async () => {
              await handleSearch(search, setSearch, setProjects, setError);
            }}
          >
            {search.loading ? <Spinner animation="border" variant="light" /> : 'Search'}
          </Button>
        </div>
        <div className="projects-container">
          {loading ? (
            <Spinner animation="border" variant="dark" />
          ) : (
            projects.map((project) => (
              <div key={project._id} className="single-project-container">
                <Link to={`/my-projects/${project._id}`}>
                  <div className="project-card">
                    <h4>{project.title}</h4>
                    <p>{project.description}</p>
                  </div>
                </Link>
                <button type="button" onClick={() => setModalShow({ open: true, id: project._id })}>
                  <i className="bi bi-trash-fill" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
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
        type="project"
        modalShow={modalShow.open}
        setModalShow={setModalShow}
        setError={setError}
        ID={modalShow.id}
        items={projects}
        setItems={setProjects}
        retrieveItems={retrieveProjects}
      />
    </PrivateTemplate>
  );
};

export default Projects;
