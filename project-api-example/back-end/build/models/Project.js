"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

const projectSchema = new _mongoose.Schema({
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
  tasks: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'task',
    default: []
  }],
  //One to Many
  owner: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  } // One to One

}, {
  timestamps: true
});
const Project = (0, _mongoose.model)('project', projectSchema);
var _default = Project;
exports.default = _default;