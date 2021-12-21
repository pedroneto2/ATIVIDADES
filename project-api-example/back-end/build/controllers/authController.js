"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _authRepository = _interopRequireDefault(require("../repositories/authRepository"));

var _authService = _interopRequireDefault(require("../services/authService"));

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const route = (0, _express.Router)();
const userDB = new _authRepository.default(_User.default);
const authService = new _authService.default(userDB);
route.use((0, _express.json)());
route.post('/register', async (req, resp, next) => {
  try {
    const newUser = await authService.register(req.body);
    resp.status(200).json(newUser);
  } catch (error) {
    next(error);
  }
});
route.post('/login', async (req, resp, next) => {
  try {
    const token = await authService.login(req.body);
    resp.status(200).json(token);
  } catch (error) {
    next(error);
  }
});
var _default = route;
exports.default = _default;