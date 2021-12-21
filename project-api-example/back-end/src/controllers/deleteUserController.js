import { Router, json } from 'express';

import AuthRepository from '../repositories/authRepository';
import AuthService from '../services/authService';
import userModel from '../models/User';

import ProjectsService from '../services/projectsService';
import ProjectsRepository from '../repositories/projectsRepository';
import projectModel from '../models/Project';

import taskModel from '../models/Task';
import TasksService from '../services/tasksService';
import TasksRepository from '../repositories/tasksRepository';

const route = Router();

const userDB = new AuthRepository(userModel);
const authService = new AuthService(userDB);

const projectDB = new ProjectsRepository(projectModel);
const projectService = new ProjectsService(projectDB);

const taskDB = new TasksRepository(taskModel);
const taskService = new TasksService(taskDB);

route.use(json());

route.delete('/', async (req, resp, next) => {
  try {
    let { id } = req.body;
    if (req.user.role !== 'admin') {
      id = req.user.id;
    }
    const deletedUser = await authService.deleteOne(id);
    const projectsFromUser = await projectService.getProjectsFromUser(id, { _id: 1 });
    projectsFromUser.forEach(async ({_id })=>{
        await taskService.deleteProjectTasks(_id)
    })
    await projectService.deleteProjectsFromUser(id);
    return resp.status(200).json(deletedUser);
  } catch (error) {
    next(error);
  }
});

export default route;
