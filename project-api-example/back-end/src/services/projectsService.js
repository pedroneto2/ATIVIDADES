import * as yup from 'yup';

import { verifySchema, validateObjectId } from './commons';

class ProjectsService {
  constructor(repository) {
    this.repository = repository;
  }
  getAllByFilter = async (filter) => {
    filter._id && validateObjectId(filter._id);
    const project = await this.repository.getAllByFilter(filter);
    return project;
  };
  getById = async (id) => {
    validateObjectId(id);
    const project = await this.repository.getById(id);
    return project;
  };
  create = async (newProjectBody) => {
    const schema = yup.object().shape({
      title: yup.string().required().min(6).max(50),
      description: yup.string().required().min(15).max(150),
    });

    await verifySchema(schema, newProjectBody);

    const newProject = await this.repository.create(newProjectBody);
    return newProject;
  };
  getProjectsFromUser = async (userID, filter = '', projection) => {
    validateObjectId(userID);
    const projects = await this.repository.getProjectsFromUser(userID, filter, projection);
    return projects;
  };
  insertTaskToProject = async (projectID, taskID) => {
    validateObjectId(projectID);
    await this.repository.insertTaskToProject(projectID, taskID);
  };
  removeTaskFromProject = async (projectID, taskID) => {
    validateObjectId(projectID);
    await this.repository.removeTaskFromProject(projectID, taskID);
  };
  deleteOne = async (projectID) => {
    validateObjectId(projectID);
    const deletedProject = await this.repository.deleteOne(projectID);
    return deletedProject;
  };
  deleteProjectsFromUser = async (userID) => {
    validateObjectId(userID);
    await this.repository.deleteProjectsFromUser(userID);
  };
}

export default ProjectsService;
