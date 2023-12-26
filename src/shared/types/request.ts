import { TelegramInitData } from '@/modules/auth/types/telegramAuthData';
import { User } from '@prisma/client';
import { Request } from 'express';

export interface IRequest extends Request {
  tgData?: TelegramInitData;
  user?: User;
}
