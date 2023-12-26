import { database } from '@/database';
import { telegramAuthMiddleware } from '@/modules/auth/middleware/telegramAuthMiddleware';
import { IRequest } from '@/shared/types/request';
import { IResponse } from '@/shared/types/response';
import { randomUUID } from 'node:crypto';

export const getTonProofControllerMiddleware = [telegramAuthMiddleware];

export const getTonProofController = async (req: IRequest, res: IResponse) => {
  if (!req.user) return;

  const proof = randomUUID();

  await database.tonProof.create({
    data: {
      proof,
      User: {
        connect: {
          id: req.user.id,
        },
      },
    },
  });

  res.status(200).send(proof);
};
