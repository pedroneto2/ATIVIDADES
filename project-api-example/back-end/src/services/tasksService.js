import * as yup from 'yup';

import InvalidBody from '../exceptions/InvalidBody';

import { verifySchema, validateObjectId } from './commons';

class TasksService {
  constructor(repository) {
    this.repository = repository;
  }
  getAllByFilter = async (filter) => {
    filter._id && validateObjectId(filter._id);
    const task = await this.repository.getAllByFilter(filter);
    return task;
  };
  getById = async (id, filter) => {
    validateObjectId(id);
    const task = await this.repository.getById(id, filter);
    return task;
  };
  create = async (newTaskBody, userOwnsProject) => {
    const schema = yup.object().shape({
      title: yup.string().required().min(6).max(50),
      description: yup.string().required().min(15).max(150),
      project: yup.string().required(),
    });

    await verifySchema(schema, newTaskBody);

    validateObjectId(schema.project);

    if (!userOwnsProject) {
      throw new InvalidBody('The user doesn`t owns this project!');
    }

    const newTask = await this.repository.create(newTaskBody);
    return newTask;
  };
  getTasksFromProject = async (projectID, filter) => {
    validateObjectId(projectID);
    const tasks = await this.repository.getTasksFromProject(projectID, filter);
    return tasks;
  };
  deleteOne = async (taskID) => {
    validateObjectId(taskID);
    const deletedTask = await this.repository.deleteOne(taskID);
    return deletedTask;
  };
  deleteProjectTasks = async (projectID) => {
    validateObjectId(projectID);
    await this.repository.deleteProjectTasks(projectID);
  };
}

export default TasksService;
