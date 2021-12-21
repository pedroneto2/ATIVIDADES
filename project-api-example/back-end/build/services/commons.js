"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateObjectId = validateObjectId;
exports.verifySchema = verifySchema;

var _InvalidBody = _interopRequireDefault(require("../exceptions/InvalidBody"));

var _mongoose = require("mongoose");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function verifySchema(schema, body) {
  try {
    await schema.validate(body, {
      abortEarly: false
    });
  } catch (error) {
    const message = error.errors.map(err => err);
    throw new _InvalidBody.default(message);
  }
}

function validateObjectId(objectId) {
  const validProjectID = (0, _mongoose.isValidObjectId)(objectId);

  if (!validProjectID) {
    throw new _InvalidBody.default('Invalid Object ID!');
  }
}