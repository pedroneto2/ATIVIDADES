import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

const setHeader = (token) => ({ headers: { Authorization: `Bearer ${token}` } });

export const login = async (loginData) => {
  const response = await api.post('/auth/login', loginData);
  return response.data;
};

export const validateToken = async (token) => {
  const response = await api.get('/authentication', setHeader(token));
  return response.data;
};

export const register = async (registerData) => {
  const response = await api.post('/auth/register', registerData);
  return response.data;
};

export const getProjects = async (token, search = '') => {
  const searchQuery = search ? `/?title=${search}` : '';
  const response = await api.get(`/projects${searchQuery}`, setHeader(token));
  return response.data;
};

export const getTasks = async (token, projectID, search = '') => {
  const searchQuery = search ? `?title=${search}` : '';
  const response = await api.get(`/tasks/${projectID}${searchQuery}`, setHeader(token));
  return response.data;
};

export const deleteProject = async (token, projectID) => {
  await api.delete(`/projects/${projectID}`, setHeader(token));
};

export const createProject = async (token, newProject) => {
  await api.post('/projects/create-project', newProject, setHeader(token));
};

export const deleteTask = async (token, taskID) => {
  await api.delete(`/tasks/task/${taskID}`, setHeader(token));
};

export const createTask = async (token, newTask) => {
  await api.post('/tasks/create-task', newTask, setHeader(token));
};
