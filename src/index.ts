import { createApp } from './app';
import { env } from './env';

createApp({ port: env.PORT });
