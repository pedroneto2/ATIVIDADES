import * as yup from 'yup';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { verifySchema, validateObjectId } from './commons';

import CredentialAlreadyInUse from '../exceptions/CredentialAlreadyInUse';
import InvalidCredentials from '../exceptions/InvalidCredentials';

class AuthService {
  constructor(repository) {
    this.repository = repository;
  }
  getOneById = async (id) => {
    validateObjectId(id);
    const user = await this.repository.getOneById(id);
    return user;
  };
  getAllByFilter = async (filter) => {
    filter._id && validateObjectId(filter._id);
    const user = await this.repository.getAllByFilter(filter);
    return user;
  };
  getOneByFilter = async (filter) => {
    filter._id && validateObjectId(filter._id);
    const user = await this.repository.getOneByFilter(filter);
    return user;
  };
  register = async (newUser) => {
    //VALIDATE newUser Schema
    const schema = yup.object().shape({
      name: yup.string().required().min(3).max(150),
      email: yup.string().required().email(),
      password: yup.string().required().min(6).max(12),
    });

    await verifySchema(schema, newUser);

    //CHECK IF newUser UNIQUE credentials EXISTS
    const filter = {
      email: newUser.email,
    };

    const existingUser = await this.getOneByFilter(filter);

    if (existingUser) {
      let credentialInUse;
      Object.keys(existingUser.toJSON()).find((key) => {
        if (existingUser[key] === filter[key]) {
          credentialInUse = key;
          return true;
        }
        return false;
      });
      throw new CredentialAlreadyInUse(credentialInUse);
    }

    //CRYPTOFY PASSWORD
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(newUser.password, salt);

    newUser.password = hash;

    //CREATE NEWUSER AND RETURN IT
    const createdUser = await this.repository.register(newUser);
    return createdUser;
  };
  login = async (user) => {
    //VALIDATE USER SCHEMA
    const schema = yup.object().shape({
      email: yup.string().required().email(),
      password: yup.string().required().max(150),
    });

    await verifySchema(schema, user);

    const targetUser = await this.repository.getOneByFilter({ email: user.email });

    if (targetUser) {
      let passwordMatches;
      try {
        passwordMatches = await bcrypt.compare(user.password, targetUser.password);
      } catch (error) {
        throw error;
      }
      if (passwordMatches) {
        const token = jwt.sign(
          { id: targetUser._id, role: targetUser.role },
          process.env.PRIVATE_KEY,
          { expiresIn: process.env.EXPIRATION_TIME }
        );
        return { token };
      }
    }
    throw new InvalidCredentials();
  };
  deleteOne = async (id) => {
    validateObjectId(id);
    const deletedUser = await this.repository.deleteOne(id);
    return deletedUser;
  };
}

export default AuthService;
