import type { Response } from 'express';
import { TErrorResponse, TSuccessResponse } from '../utils/types';

export const sendSuccessResponse = (
  res: Response,
  payload: TSuccessResponse,
) => {
  const { message, meta, data } = payload;
  return res.status(200).json({ message, meta, data });
};

export const sendErrorResponse = (res: Response, payload: TErrorResponse) => {
  const { status, message, error } = payload;
  return res.status(status).json({ ok: false, message, error });
};