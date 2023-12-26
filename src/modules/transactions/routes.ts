import express from 'express';
import { telegramAuthMiddleware } from '../auth/middleware/telegramAuthMiddleware';
import { getTransactionsController, getTransactionsControllerMiddleware } from './controllers/getTransactions';

export const transactionsRouter = express.Router();

transactionsRouter.get('/', getTransactionsControllerMiddleware, getTransactionsController);
