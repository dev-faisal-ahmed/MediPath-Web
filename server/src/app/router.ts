import { Router } from 'express';
import { authRouter } from '../modules/auth/router';
import { patientsRouter } from '../modules/patient/router';
import { overviewRouter } from '../modules/overview/router';
import { billRouter, billsRouter } from '../modules/bill/router';
import { agentRouter, agentsRouter } from '../modules/agent/router';
import { doctorRouter, doctorsRouter } from '../modules/doctor/router';
import { serviceRouter, servicesRouter } from '../modules/service/router';

export const appRouter = Router();

appRouter.use('/auth', authRouter);
appRouter.use('/doctor', doctorRouter);
appRouter.use('/doctors', doctorsRouter);
appRouter.use('/agent', agentRouter);
appRouter.use('/agents', agentsRouter);
appRouter.use('/service', serviceRouter);
appRouter.use('/services', servicesRouter);
appRouter.use('/bill', billRouter);
appRouter.use('/bills', billsRouter);
appRouter.use('/patients', patientsRouter);
appRouter.use('/overview', overviewRouter);
