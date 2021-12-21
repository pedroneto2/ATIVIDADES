import { Router } from 'express';
import jwt from 'jsonwebtoken';

import projectsController from './controllers/projectsController';
import tasksController from './controllers/tasksController';
import authController from './controllers/authController';
import deleteUserController from './controllers/deleteUserController';

import NotAuthorized from './exceptions/NotAuthorized';

const routes = Router();

//PUBLIC ROUTES
routes.use('/auth', authController);

//PRIVATE ROUTES
routes.use((req, resp, next) => {
  //RECEBER O TOKEN DE AUTENTICAÇÃO E VERIFICAR SE É VÁLIDO
  const bearerToken = req.get('Authorization') || '';

  const token = bearerToken.slice(7);

  try {
    const tokenPayLoad = jwt.verify(token, process.env.PRIVATE_KEY);
    req.user = { id: tokenPayLoad.id, role: tokenPayLoad.role };
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
    return next(new NotAuthorized(message));
  }
});

routes.use('/projects', projectsController);
routes.use('/tasks', tasksController);
routes.use('/delete-user', deleteUserController);
routes.get('/authentication', (req, resp,next) => resp.status(200).json(req.user));

export default routes;
