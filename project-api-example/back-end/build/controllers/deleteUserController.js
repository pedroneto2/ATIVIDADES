"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _authRepository = _interopRequireDefault(require("../repositories/authRepository"));

var _authService = _interopRequireDefault(require("../services/authService"));

var _User = _interopRequireDefault(require("../models/User"));

var _projectsService = _interopRequireDefault(require("../services/projectsService"));

var _projectsRepository = _interopRequireDefault(require("../repositories/projectsRepository"));

var _Project = _interopRequireDefault(require("../models/Project"));

var _Task = _interopRequireDefault(require("../models/Task"));

var _tasksService = _interopRequireDefault(require("../services/tasksService"));

var _tasksRepository = _interopRequireDefault(require("../repositories/tasksRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const route = (0, _express.Router)();
const userDB = new _authRepository.default(_User.default);
const authService = new _authService.default(userDB);
const projectDB = new _projectsRepository.default(_Project.default);
const projectService = new _projectsService.default(projectDB);
const taskDB = new _tasksRepository.default(_Task.default);
const taskService = new _tasksService.default(taskDB);
route.use((0, _express.json)());
route.delete('/', async (req, resp, next) => {
  try {
    let {
      id
    } = req.body;

    if (req.user.role !== 'admin') {
      id = req.user.id;
    }

    const deletedUser = await authService.deleteOne(id);
    const projectsFromUser = await projectService.getProjectsFromUser(id, {
      _id: 1
    });
    projectsFromUser.forEach(async ({
      _id
    }) => {
      await taskService.deleteProjectTasks(_id);
    });
    await projectService.deleteProjectsFromUser(id);
    return resp.status(200).json(deletedUser);
  } catch (error) {
    next(error);
  }
});
var _default = route;
exports.default = _default;