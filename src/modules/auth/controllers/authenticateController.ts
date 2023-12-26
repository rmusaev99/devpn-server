import { database } from '@/database';
import { TelegramInitData } from '../types/telegramAuthData';
import { authService } from '../service';
import { IRequest } from '@/shared/types/request';
import { IResponse } from '@/shared/types/response';
import { logger } from '@/logger';
import { z } from 'zod';
import { validateRequestMiddleware } from '@/shared/middleware/validateRequest';

const schema = z.object({
  id: z.string(),
  username: z.string(),
  auth_date: z.string(),
  hash: z.string(),
});

export const authenticateControllerMiddleware = [
  validateRequestMiddleware(schema),
];

export const authenticateController = async (req: IRequest, res: IResponse) => {
  const { id, username } = req.query as TelegramInitData;

  const isDataValid = authService.validateTelegramData(
    req.query as TelegramInitData
  );

  if (!isDataValid) {
    logger.error(`Data is not from Telegram, ${JSON.stringify(req.query)}`);
    return res.status(401).send('Data is not from Telegram');
  }

  let user = await database.user.findFirst({
    where: { telegramId: String(id), telegramUsername: username },
  });

  if (!user) {
    user = await database.user.create({
      data: {
        telegramId: String(id),
        telegramUsername: username,
      },
      include: {
        TonWallet: true,
      },
    });
  }

  res.status(200).json({
    message: 'Authenticated successfully',
    user,
  });
};
