import express from 'express';
import {
  authenticateController,
  authenticateControllerMiddleware,
} from './controllers/authenticateController';

export const authRouter = express.Router();

authRouter.get(
  '/authenticate',
  authenticateControllerMiddleware,
  authenticateController
);
