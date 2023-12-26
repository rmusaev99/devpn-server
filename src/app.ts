import express from 'express';
import { authRouter } from './modules/auth/routes';
import { serversRouter } from './modules/servers/routes';
import { plansRouter } from './modules/plans/routes';
import { transactionsRouter } from './modules/transactions/routes';
import { walletRouter } from './modules/wallet/router';

interface AppConfig {
  port: number;
}

export const createApp = (config: AppConfig) => {
  const app = express();
  app.use(express.json());

  app.listen(config.port, () => {
    console.log(`Server is running on http://localhost:${config.port}`);
  });

  app.use('/auth', authRouter);
  app.use('/servers', serversRouter);
  app.use('/plans', plansRouter);
  app.use('/transactions', transactionsRouter);
  app.use('/wallet', walletRouter);

  return app;
};
