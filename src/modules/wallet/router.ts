import express from 'express';
import {
  getTonProofController,
  getTonProofControllerMiddleware,
} from './controllers/getTonProof';
import { telegramAuthMiddleware } from '../auth/middleware/telegramAuthMiddleware';
import { validateRequestMiddleware } from '@/shared/middleware/validateRequest';
import {
  connectWalletController,
  connectWalletControllerMiddleware,
} from './controllers/connectWallet';

export const walletRouter = express.Router();

walletRouter.get(
  '/ton-proof',
  getTonProofControllerMiddleware,
  getTonProofController
);

walletRouter.post(
  '/connect-ton-wallet',
  connectWalletControllerMiddleware,
  connectWalletController
);
