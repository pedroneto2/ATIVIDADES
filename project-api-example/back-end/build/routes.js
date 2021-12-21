"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _projectsController = _interopRequireDefault(require("./controllers/projectsController"));

var _tasksController = _interopRequireDefault(require("./controllers/tasksController"));

var _authController = _interopRequireDefault(require("./controllers/authController"));

var _deleteUserController = _interopRequireDefault(require("./controllers/deleteUserController"));

var _NotAuthorized = _interopRequireDefault(require("./exceptions/NotAuthorized"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express.Router)(); //PUBLIC ROUTES

routes.use('/auth', _authController.default); //PRIVATE ROUTES

routes.use((req, resp, next) => {
  //RECEBER O TOKEN DE AUTENTICAÇÃO E VERIFICAR SE É VÁLIDO
  const bearerToken = req.get('Authorization') || '';
  const token = bearerToken.slice(7);

  try {
    const tokenPayLoad = _jsonwebtoken.default.verify(token, process.env.PRIVATE_KEY);

    req.user = {
      id: tokenPayLoad.id,
      role: tokenPayLoad.role
    };
    return next();
  } catch (error) {
    let message;

    switch (error.message) {
      case 'jwt must be provided':
        message = 'You must be logged in!';
        break;

      case 'jwt malformed':
        message = 'Invalid session';
        break;

      case 'invalid token':
        message = 'Session expired';
        break;

      default:
        message = 'Not authorized';
    }

    return next(new _NotAuthorized.default(message));
  }
});
routes.use('/projects', _projectsController.default);
routes.use('/tasks', _tasksController.default);
routes.use('/delete-user', _deleteUserController.default);
var _default = routes;
exports.default = _default;