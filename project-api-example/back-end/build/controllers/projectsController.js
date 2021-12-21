"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _projectsService = _interopRequireDefault(require("../services/projectsService"));

var _projectsRepository = _interopRequireDefault(require("../repositories/projectsRepository"));

var _Project = _interopRequireDefault(require("../models/Project"));

var _Task = _interopRequireDefault(require("../models/Task"));

var _tasksService = _interopRequireDefault(require("../services/tasksService"));

var _tasksRepository = _interopRequireDefault(require("../repositories/tasksRepository"));

var _commons = require("./commons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const route = (0, _express.Router)(); //Injeção de Dependências

const projectDB = new _projectsRepository.default(_Project.default);
const projectService = new _projectsService.default(projectDB);
const taskDB = new _tasksRepository.default(_Task.default);
const taskService = new _tasksService.default(taskDB); // Routes

route.get('/', async (req, resp, next) => {
  const errorMsg = 'You must be logged as an user!';

  try {
    (0, _commons.verifyAuthorization)(req.user, undefined, 'user', errorMsg);
    const projects = await projectService.getProjectsFromUser(req.user.id);
    return resp.status(200).json(projects);
  } catch (error) {
    return next(error);
  }
});
route.get('/all/', async (req, resp, next) => {
  try {
    (0, _commons.verifyAuthorization)(req.user);
    const filter = req.query;
    const projects = await projectService.getAllByFilter(filter);
    return resp.status(200).json(projects);
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
    return resp.status(200).json(project);
  } catch (error) {
    return next(error);
  }
});
route.use((0, _express.json)());
route.post('/create-project/', async (req, resp, next) => {
  const errorMsg = 'You can not create a project as an admin!';

  try {
    (0, _commons.verifyAuthorization)(req.user, undefined, 'user', errorMsg);
    const newProject = await projectService.create({ ...req.body,
      owner: req.user.id
    });
    return resp.status(200).json(newProject);
  } catch (error) {
    return next(error);
  }
});
route.delete('/:id', async (req, resp, next) => {
  try {
    const {
      id
    } = req.params;
    const project = await projectService.getById(id);
    const ownerID = project ? project.owner.toString() : undefined;
    (0, _commons.verifyAuthorization)(req.user, ownerID);
    const deletedProject = await projectService.deleteOne(id);
    await taskService.deleteProjectTasks(id);
    return resp.status(200).json(deletedProject);
  } catch (error) {
    return next(error);
  }
});
var _default = route;
exports.default = _default;