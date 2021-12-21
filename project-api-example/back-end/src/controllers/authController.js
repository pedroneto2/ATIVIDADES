import { Router, json } from 'express';

import AuthRepository from '../repositories/authRepository';
import AuthService from '../services/authService';
import userModel from '../models/User';

const route = Router();

const userDB = new AuthRepository(userModel);
const authService = new AuthService(userDB);

route.use(json());

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

export default route;
