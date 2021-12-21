"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyAuthorization = verifyAuthorization;

var _NotAuthorized = _interopRequireDefault(require("../exceptions/NotAuthorized"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const defaultErrorMsg = 'You must be an admin!';

function verifyAuthorization(user, targetID = '', targetRole = 'admin', errorMsg = defaultErrorMsg) {
  if (user.id !== targetID && user.role !== targetRole) {
    throw new _NotAuthorized.default(errorMsg);
  }
}