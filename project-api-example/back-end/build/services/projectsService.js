"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var yup = _interopRequireWildcard(require("yup"));

var _commons = require("./commons");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class ProjectsService {
  constructor(repository) {
    this.repository = repository;
  }

  getAllByFilter = async filter => {
    filter._id && (0, _commons.validateObjectId)(filter._id);
    const project = await this.repository.getAllByFilter(filter);
    return project;
  };
  getById = async id => {
    (0, _commons.validateObjectId)(id);
    const project = await this.repository.getById(id);
    return project;
  };
  create = async newProjectBody => {
    const schema = yup.object().shape({
      title: yup.string().required().min(6).max(50),
      description: yup.string().required().min(15).max(150)
    });
    await (0, _commons.verifySchema)(schema, newProjectBody);
    const newProject = await this.repository.create(newProjectBody);
    return newProject;
  };
  getProjectsFromUser = async (userID, projection) => {
    (0, _commons.validateObjectId)(userID);
    const projects = await this.repository.getProjectsFromUser(userID, projection);
    return projects;
  };
  insertTaskToProject = async (projectID, taskID) => {
    (0, _commons.validateObjectId)(projectID);
    await this.repository.insertTaskToProject(projectID, taskID);
  };
  removeTaskFromProject = async (projectID, taskID) => {
    (0, _commons.validateObjectId)(projectID);
    await this.repository.removeTaskFromProject(projectID, taskID);
  };
  deleteOne = async projectID => {
    (0, _commons.validateObjectId)(projectID);
    const deletedProject = await this.repository.deleteOne(projectID);
    return deletedProject;
  };
  deleteProjectsFromUser = async userID => {
    (0, _commons.validateObjectId)(userID);
    await this.repository.deleteProjectsFromUser(userID);
  };
}

var _default = ProjectsService;
exports.default = _default;