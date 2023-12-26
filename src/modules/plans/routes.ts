import express from 'express';
import { getPlansController } from './controllers/getPlans';
import {
  getCurrentUsage,
  getCurrentUsageMiddleware,
} from './controllers/getCurrentUsage';
import {
  activateFreePlan,
  activateFreePlanMiddleware,
} from './controllers/activateFreePlan';

export const plansRouter = express.Router();

plansRouter.get('/', getPlansController);

plansRouter.get('/current/usage', getCurrentUsageMiddleware, getCurrentUsage);

plansRouter.post(
  '/activate/free',
  activateFreePlanMiddleware,
  activateFreePlan
);
