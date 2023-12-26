import { env } from '@/env';
import crypto from 'node:crypto';
import { TelegramInitData } from './types/telegramAuthData';

export const authService = {
  validateTelegramData: (telegramInitData: TelegramInitData) => {
    const secretKey = crypto
      .createHash('sha256')
      .update(env.TELEGRAM_BOT_TOKEN)
      .digest();

    const checkString = Object.entries(telegramInitData)
      .filter((entry) => entry[0] !== 'hash')
      .sort()
      .map((entry) => `${entry[0]}=${entry[1]}`)
      .join('\n');

    const hmac = crypto
      .createHmac('sha256', secretKey)
      .update(checkString)
      .digest('hex');

    if (hmac !== telegramInitData.hash) {
      return false;
    }

    return true;
  },
};
