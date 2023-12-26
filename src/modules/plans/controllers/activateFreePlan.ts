import { database } from '@/database';
import { telegramAuthMiddleware } from '@/modules/auth/middleware/telegramAuthMiddleware';
import { IResponse } from '@/shared/types/response';
import { planService } from '../service';
import { IRequest } from '@/shared/types/request';

export const activateFreePlanMiddleware = [telegramAuthMiddleware];

export const activateFreePlan = async (req: IRequest, res: IResponse) => {
  if (!req.user) return;

  if (req.user.isFreePlanUsed) {
    res.status(400).send('Free plan is already activated.');
  }

  const plan = await database.plan.findFirst({
    where: {
      price: 0,
    },
  });

  if (!plan) {
    res.status(404).send('Free plan not found.');
    return;
  }

  await planService.activatePlan(req.user.id, plan.id);

  await database.user.update({
    where: {
      id: req.user.id,
    },
    data: {
      isFreePlanUsed: true,
    },
  });

  res.send('Plan activated successfully.');
};
