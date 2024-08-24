import { Router } from 'express';
import { authRouter } from '../modules/auth/router';
import { doctorRouter, doctorsRouter } from '../modules/doctor/router';
import { agentRouter, agentsRouter } from '../modules/agent/router';

export const appRouter = Router();

appRouter.use('/auth', authRouter);
appRouter.use('/doctor', doctorRouter);
appRouter.use('/doctors', doctorsRouter);
appRouter.use('/agent', agentRouter);
appRouter.use('/agents', agentsRouter);
