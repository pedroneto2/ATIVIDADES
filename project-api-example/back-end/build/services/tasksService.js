"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var yup = _interopRequireWildcard(require("yup"));

var _InvalidBody = _interopRequireDefault(require("../exceptions/InvalidBody"));

var _commons = require("./commons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class TasksService {
  constructor(repository) {
    this.repository = repository;
  }

  getAllByFilter = async filter => {
    filter._id && (0, _commons.validateObjectId)(filter._id);
    const task = await this.repository.getAllByFilter(filter);
    return task;
  };
  getById = async id => {
    (0, _commons.validateObjectId)(id);
    const task = await this.repository.getById(id);
    return task;
  };
  create = async (newTaskBody, userOwnsProject) => {
    const schema = yup.object().shape({
      title: yup.string().required().min(6).max(50),
      description: yup.string().required().min(15).max(150),
      project: yup.string().required()
    });
    await (0, _commons.verifySchema)(schema, newTaskBody);
    (0, _commons.validateObjectId)(schema.project);

    if (!userOwnsProject) {
      throw new _InvalidBody.default('The user doesn`t owns this project!');
    }

    const newTask = await this.repository.create(newTaskBody);
    return newTask;
  };
  getTasksFromProject = async projectID => {
    (0, _commons.validateObjectId)(projectID);
    const tasks = await this.repository.getTasksFromProject(projectID);
    return tasks;
  };
  deleteOne = async taskID => {
    (0, _commons.validateObjectId)(taskID);
    const deletedTask = await this.repository.deleteOne(taskID);
    return deletedTask;
  };
  deleteProjectTasks = async projectID => {
    (0, _commons.validateObjectId)(projectID);
    await this.repository.deleteProjectTasks(projectID);
  };
}

var _default = TasksService;
exports.default = _default;