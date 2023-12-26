import { z } from 'zod';

export enum CHAIN {
    MAINNET = '-239',
    TESTNET = '-3'
}

export const tonAccountSchema = z.object({
  address: z.string(),
  publicKey: z.string(),
  chain: z.union([z.literal(CHAIN.MAINNET), z.literal(CHAIN.TESTNET)]),
  walletStateInit: z.string(),
});

export type TonAcctount = z.infer<typeof tonAccountSchema>;