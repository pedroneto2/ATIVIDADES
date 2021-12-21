"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _Task = _interopRequireDefault(require("../models/Task"));

var _tasksService = _interopRequireDefault(require("../services/tasksService"));

var _tasksRepository = _interopRequireDefault(require("../repositories/tasksRepository"));

var _projectsService = _interopRequireDefault(require("../services/projectsService"));

var _projectsRepository = _interopRequireDefault(require("../repositories/projectsRepository"));

var _Project = _interopRequireDefault(require("../models/Project"));

var _commons = require("./commons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const route = (0, _express.Router)();
const taskDB = new _tasksRepository.default(_Task.default);
const taskService = new _tasksService.default(taskDB);
const projectDB = new _projectsRepository.default(_Project.default);
const projectService = new _projectsService.default(projectDB); // Routes

route.get('/all/', async (req, resp, next) => {
  try {
    (0, _commons.verifyAuthorization)(req.user);
    const filter = req.query;
    const tasks = await taskService.getAllByFilter(filter);
    return resp.status(200).json(tasks);
  } catch (error) {
    return next(error);
  }
});
route.get('/:id', async (req, resp, next) => {
  try {
    const {
      id
    } = req.params;
    const project = await projectService.getById(id);
    const ownerID = project ? project.owner.toString() : undefined;
    (0, _commons.verifyAuthorization)(req.user, ownerID);
    const tasks = await taskService.getTasksFromProject(id);
    return resp.status(200).json(tasks);
  } catch (error) {
    return next(error);
  }
});
route.get('/task/:id', async (req, resp, next) => {
  try {
    const {
      id
    } = req.params;
    const task = await taskService.getById(id);
    const projectID = task ? task.project : undefined;
    const project = await projectService.getById(projectID);
    const ownerID = project ? project.owner.toString() : undefined;
    (0, _commons.verifyAuthorization)(req.user, ownerID);
    return resp.status(200).json(task);
  } catch (error) {
    return next(error);
  }
});
route.use((0, _express.json)());
route.post('/create-task', async (req, resp, next) => {
  const errorMsg = 'You must be logged as an user!';

  try {
    (0, _commons.verifyAuthorization)(req.user, undefined, 'user', errorMsg);
    const {
      project
    } = req.body;
    const projectTask = await projectService.getById(project, {
      _id: 1
    });
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
    const {
      id
    } = req.params;
    const task = await taskService.getById(id);
    const projectID = task.project.toString();
    const project = await projectService.getById(projectID);
    (0, _commons.verifyAuthorization)(req.user, project.owner.toString());
    await projectService.removeTaskFromProject(projectID, id);
    const deletedTask = await taskService.deleteOne(id);
    return resp.status(200).json(deletedTask);
  } catch (error) {
    return next(error);
  }
});
var _default = route;
exports.default = _default;