import express from 'express';
import { getServerListController } from './controllers/getServerListController';

export const serversRouter = express.Router();

serversRouter.get('/', getServerListController);
