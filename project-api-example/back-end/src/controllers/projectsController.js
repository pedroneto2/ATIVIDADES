import { Router, json } from 'express';

import ProjectsService from '../services/projectsService';
import ProjectsRepository from '../repositories/projectsRepository';
import projectModel from '../models/Project';

import taskModel from '../models/Task';
import TasksService from '../services/tasksService';
import TasksRepository from '../repositories/tasksRepository';

import { verifyAuthorization } from './commons';

const route = Router();

//Injeção de Dependências
const projectDB = new ProjectsRepository(projectModel);
const projectService = new ProjectsService(projectDB);

const taskDB = new TasksRepository(taskModel);
const taskService = new TasksService(taskDB);

// Routes
route.get('/', async (req, resp, next) => {
  const errorMsg = 'You must be logged as an user!';
  try {
    const filter = req.query
    verifyAuthorization(req.user, undefined, 'user', errorMsg);
    const projects = await projectService.getProjectsFromUser(req.user.id,filter);
    return resp.status(200).json(projects);
  } catch (error) {
    return next(error);
  }
});

route.get('/all/', async (req, resp, next) => {
  try {
    verifyAuthorization(req.user);
    const filter = req.query;
    const projects = await projectService.getAllByFilter(filter);
    return resp.status(200).json(projects);
  } catch (error) {
    return next(error);
  }
});

route.get('/:id', async (req, resp, next) => {
  try {
    const { id } = req.params;
    const project = await projectService.getById(id);
    const ownerID = project ? project.owner.toString() : undefined;
    verifyAuthorization(req.user, ownerID);
    return resp.status(200).json(project);
  } catch (error) {
    return next(error);
  }
});

route.use(json());

route.post('/create-project/', async (req, resp, next) => {
  const errorMsg = 'You can not create a project as an admin!';
  try {
    verifyAuthorization(req.user, undefined, 'user', errorMsg);
    const newProject = await projectService.create({ ...req.body, owner: req.user.id });
    return resp.status(200).json(newProject);
  } catch (error) {
    return next(error);
  }
});

route.delete('/:id', async (req, resp, next) => {
  try {
    const { id } = req.params;
    const project = await projectService.getById(id);
    const ownerID = project ? project.owner.toString() : undefined;
    verifyAuthorization(req.user, ownerID);
    const deletedProject = await projectService.deleteOne(id);
    await taskService.deleteProjectTasks(id);
    return resp.status(200).json(deletedProject);
  } catch (error) {
    return next(error);
  }
});

export default route;
