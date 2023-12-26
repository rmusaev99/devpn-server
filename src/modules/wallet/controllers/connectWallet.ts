import { database } from '@/database';
import { logger } from '@/logger';
import { telegramAuthMiddleware } from '@/modules/auth/middleware/telegramAuthMiddleware';
import { validateRequestMiddleware } from '@/shared/middleware/validateRequest';
import { tonAccountSchema } from '@/shared/models/tonAccount';
import { IRequest } from '@/shared/types/request';
import { IResponse } from '@/shared/types/response';
import { z } from 'zod';

const schema = z.object({
  proof: z.string().length(36),
  tonAccount: tonAccountSchema,
});

type Payload = z.infer<typeof schema>;

export const connectWalletControllerMiddleware = [
  telegramAuthMiddleware,
  validateRequestMiddleware(schema),
];

export const connectWalletController = async (
  req: IRequest,
  res: IResponse
) => {
  if (!req.user) return;

  try {
    const payload = schema.parse(req.body) as Payload;

    const proof = await database.tonProof.findFirst({
      where: {
        proof: payload.proof,
        userId: req.user.id,
      },
    });

    if (!proof) {
      return res.status(400).json({
        message: 'Proof failed.',
      });
    }

    await database.tonWallet.create({
      data: {
        address: payload.tonAccount.address,
        publicKey: payload.tonAccount.publicKey,
        chain: payload.tonAccount.chain,
        walletStateInit: payload.tonAccount.walletStateInit,
        User: {
          connect: {
            id: req.user.id,
          },
        },
      },
    });

    await database.tonProof.delete({
      where: {
        id: proof.id,
      },
    });

    res.status(200).send('Wallet connected successfully');
  } catch (error) {
    logger.error(error);
    res.status(400).json({
      message: 'Something went wrong',
    });
  }
};
