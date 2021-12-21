"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var yup = _interopRequireWildcard(require("yup"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _commons = require("./commons");

var _CredentialAlreadyInUse = _interopRequireDefault(require("../exceptions/CredentialAlreadyInUse"));

var _InvalidCredentials = _interopRequireDefault(require("../exceptions/InvalidCredentials"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class AuthService {
  constructor(repository) {
    this.repository = repository;
  }

  getOneById = async id => {
    (0, _commons.validateObjectId)(id);
    const user = await this.repository.getOneById(id);
    return user;
  };
  getAllByFilter = async filter => {
    filter._id && (0, _commons.validateObjectId)(filter._id);
    const user = await this.repository.getAllByFilter(filter);
    return user;
  };
  getOneByFilter = async filter => {
    filter._id && (0, _commons.validateObjectId)(filter._id);
    const user = await this.repository.getOneByFilter(filter);
    return user;
  };
  register = async newUser => {
    //VALIDATE newUser Schema
    const schema = yup.object().shape({
      name: yup.string().required().min(3).max(150),
      email: yup.string().required().email(),
      password: yup.string().required().min(6).max(12)
    });
    await (0, _commons.verifySchema)(schema, newUser); //CHECK IF newUser UNIQUE credentials EXISTS

    const filter = {
      email: newUser.email
    };
    const existingUser = await this.getOneByFilter(filter);

    if (existingUser) {
      let credentialInUse;
      Object.keys(existingUser.toJSON()).find(key => {
        if (existingUser[key] === filter[key]) {
          credentialInUse = key;
          return true;
        }

        return false;
      });
      throw new _CredentialAlreadyInUse.default(credentialInUse);
    } //CRYPTOFY PASSWORD


    const salt = _bcrypt.default.genSaltSync(10);

    const hash = _bcrypt.default.hashSync(newUser.password, salt);

    newUser.password = hash; //CREATE NEWUSER AND RETURN IT

    const createdUser = await this.repository.register(newUser);
    return createdUser;
  };
  login = async user => {
    //VALIDATE USER SCHEMA
    const schema = yup.object().shape({
      email: yup.string().required().email(),
      password: yup.string().required().max(150)
    });
    await (0, _commons.verifySchema)(schema, user);
    const targetUser = await this.repository.getOneByFilter({
      email: user.email
    });

    if (targetUser) {
      let passwordMatches;

      try {
        passwordMatches = await _bcrypt.default.compare(user.password, targetUser.password);
      } catch (error) {
        throw error;
      }

      if (passwordMatches) {
        const token = _jsonwebtoken.default.sign({
          id: targetUser._id,
          role: targetUser.role
        }, process.env.PRIVATE_KEY, {
          expiresIn: process.env.EXPIRATION_TIME
        });

        return {
          token
        };
      }
    }

    throw new _InvalidCredentials.default();
  };
  deleteOne = async id => {
    (0, _commons.validateObjectId)(id);
    const deletedUser = await this.repository.deleteOne(id);
    return deletedUser;
  };
}

var _default = AuthService;
exports.default = _default;