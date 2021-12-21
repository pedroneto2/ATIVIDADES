import { Router, json } from 'express';

import taskModel from '../models/Task';
import TasksService from '../services/tasksService';
import TasksRepository from '../repositories/tasksRepository';

import ProjectsService from '../services/projectsService';
import ProjectsRepository from '../repositories/projectsRepository';
import projectModel from '../models/Project';

import { verifyAuthorization } from './commons';

const route = Router();

const taskDB = new TasksRepository(taskModel);
const taskService = new TasksService(taskDB);

const projectDB = new ProjectsRepository(projectModel);
const projectService = new ProjectsService(projectDB);

// Routes
route.get('/all/', async (req, resp, next) => {
  try {
    verifyAuthorization(req.user);
    const filter = req.query;
    const tasks = await taskService.getAllByFilter(filter);
    return resp.status(200).json(tasks);
  } catch (error) {
    return next(error);
  }
});

route.get('/:id', async (req, resp, next) => {
  try {
    const { id } = req.params;
    const filter = req.query;
    const project = await projectService.getById(id);
    const ownerID = project ? project.owner.toString() : undefined;
    verifyAuthorization(req.user, ownerID);
    const tasks = await taskService.getTasksFromProject(id, filter);
    return resp.status(200).json(tasks);
  } catch (error) {
    return next(error);
  }
});

route.get('/task/:id', async (req, resp, next) => {
  try {
    const { id } = req.params;
    const task = await taskService.getById(id);
    const projectID = task ? task.project : undefined;
    const project = await projectService.getById(projectID);
    const ownerID = project ? project.owner.toString() : undefined;
    verifyAuthorization(req.user, ownerID);
    return resp.status(200).json(task);
  } catch (error) {
    return next(error);
  }
});

route.use(json());

route.post('/create-task', async (req, resp, next) => {
  const errorMsg = 'You must be logged as an user!';
  try {
    verifyAuthorization(req.user, undefined, 'user', errorMsg);
    const { project } = req.body;
    const projectTask = await projectService.getById(project, { _id: 1 });
    const owner = projectTask ? projectTask.owner.toString() : '';
    const userOwnsProject = owner === req.user.id;
    const newTask = await taskService.create(req.body, userOwnsProject);
    await projectService.insertTaskToProject(project, newTask._id);
    return resp.status(200).json(newTask);
  } catch (error) {
    return next(error);
  }
});

route.delete('/task/:id', async (req, resp, next) => {
  try {
    const { id } = req.params;
    const task = await taskService.getById(id);
    const projectID = task.project.toString();
    const project = await projectService.getById(projectID);
    verifyAuthorization(req.user, project.owner.toString());
    await projectService.removeTaskFromProject(projectID, id);
    const deletedTask = await taskService.deleteOne(id);
    return resp.status(200).json(deletedTask);
  } catch (error) {
    return next(error);
  }
});

export default route;
