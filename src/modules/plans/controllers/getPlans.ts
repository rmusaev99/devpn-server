import { database } from '@/database';
import { IRequest } from '@/shared/types/request';
import { IResponse } from '@/shared/types/response';

export const getPlansController = async (req: IRequest, res: IResponse) => {
  if (!req.user) return;

  try {
    const plans = await database.plan.findMany();
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json('Failed to get plans');
  }
};
