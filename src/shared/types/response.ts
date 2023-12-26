import { Response } from 'express';

export interface IResponse extends Response {} // for auto imports, since Request interface in scope it isn't auto imported from express