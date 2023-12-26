import { database } from '@/database';
import { IRequest } from '@/shared/types/request';
import { IResponse } from '@/shared/types/response';

export const getServerListController = async (req: IRequest, res: IResponse) => {
  try {
    const servers = await database.server.findMany();

    res.status(200).send(servers);
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to get server list.');
  }
};
