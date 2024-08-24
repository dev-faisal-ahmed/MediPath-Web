import { Router } from 'express';
import { authRouter } from '../modules/auth/router';
import { doctorRouter } from '../modules/doctor/router';

export const appRouter = Router();

appRouter.use('/auth', authRouter);
appRouter.use('/doctor', doctorRouter);
