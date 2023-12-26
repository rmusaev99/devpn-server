import { cleanEnv, port, str } from 'envalid'
import { config } from 'dotenv';

config();

export const env = cleanEnv(process.env, {
  PORT: port({ default: 3000 }),
  TELEGRAM_BOT_TOKEN: str(),
  JWT_SECRET: str(),
});