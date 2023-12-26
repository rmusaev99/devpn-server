import { database } from '@/database';
import { telegramAuthMiddleware } from '@/modules/auth/middleware/telegramAuthMiddleware';
import { IRequest } from '@/shared/types/request';
import { IResponse } from '@/shared/types/response';

export const getTransactionsControllerMiddleware = [telegramAuthMiddleware];

export const getTransactionsController = async (
  req: IRequest,
  res: IResponse
) => {
  if (!req.user) return;

  try {
    const transactions = await database.transaction.findMany({
      where: {
        userId: req.user.id,
      },
    });

    res.status(200).send(transactions);
  } catch (error) {
    console.log(error);
    res.status(500).send('Failed to get transactions.');
  }
};
