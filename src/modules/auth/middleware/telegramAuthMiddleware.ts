import { Request, Response, NextFunction } from 'express';
import { authService } from '../service';
import { database } from '@/database';
import { IAuthorizedRequest, IRequest } from '@/shared/types/request';

const extractTelegramDataFromRequestQuery = (query: Request['query']) => {
  try {
    const decoded = decodeURIComponent(query.tgData as string);
    return JSON.parse(decoded);
  } catch (error) {
    return null;
  }
};

export const telegramAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let tgData;

  if (!req.query.tgData && !req.body.tgData) {
    res.status(400).send('tgData is required for this request.');
    return;
  }

  if (req.method === 'GET') {
    tgData = extractTelegramDataFromRequestQuery(req.query);

    if (!tgData) {
      res.status(400).send('Invalid tgData format.');
      return;
    }
  } else {
    tgData = req.body.tgData;
  }

  if (!authService.validateTelegramData(tgData)) {
    res.status(401).send('Unauthorized.');
    return;
  }

  const user = await database.user.findUnique({
    where: {
      telegramId: tgData.id,
    },
  });

  if (!user) {
    res
      .status(401)
      .send('User should be authorized first. Call authenticate method.');
    return;
  }

  (req as IAuthorizedRequest).tgData = tgData;
  (req as IAuthorizedRequest).user = user;

  next();
};
