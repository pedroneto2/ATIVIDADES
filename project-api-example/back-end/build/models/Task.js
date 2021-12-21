"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

const taskSchema = new _mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 50
  },
  description: {
    type: String,
    required: true,
    minlength: 15,
    maxlength: 150
  },
  project: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'project',
    required: true
  } //One to One

}, {
  timestamps: true
});
const Task = (0, _mongoose.model)('task', taskSchema);
var _default = Task;
exports.default = _default;