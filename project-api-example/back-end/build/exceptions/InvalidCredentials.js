"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class InvalidCredentials extends Error {
  constructor() {
    super();
    this.status = 400;
    this.message = 'Invalid credentials!';
  }

}

var _default = InvalidCredentials;
exports.default = _default;