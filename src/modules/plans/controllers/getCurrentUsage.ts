import { database } from '@/database';
import { telegramAuthMiddleware } from '@/modules/auth/middleware/telegramAuthMiddleware';
import { IResponse } from '@/shared/types/response';
import { planService } from '../service';
import { IRequest } from '@/shared/types/request';

export const getCurrentUsageMiddleware = [telegramAuthMiddleware];

export const getCurrentUsage = async (req: IRequest, res: IResponse) => {
  if (!req.user) return;

  try {
    const usage = await planService.getCurrentUsageForUser(req.user.id);

    if (!usage) {
      res
        .status(404)
        .send("No usage records. Seems like plan wasn't activated.");

      return;
    }

    res.status(200).send(usage);
  } catch (error) {
    res.status(500).send('Failed to get current usage.');
  }
};
