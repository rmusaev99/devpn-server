import { NextFunction } from 'express';
import { z } from 'zod';
import { IRequest } from '../types/request';
import { IResponse } from '../types/response';

export const validateRequestMiddleware = (schema: z.ZodObject<any, any>) =>
  async (req: IRequest, res: IResponse, next: NextFunction) => {
    try {
      if (req.method === 'GET') {
        schema.parse(req.query);
      } else {
        schema.parse(req.body);
      }

      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: 'Validation failed',
          errors: error.errors,
        });
      }

      console.error(error);

      res.status(500).json('Something went wrong.');
    }
  };
