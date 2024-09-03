import { Router } from 'express';
import { authRouter } from '../modules/auth/router';
import { patientsRouter } from '../modules/patient/router';
import { overviewRouter } from '../modules/overview/router';
import { billRouter, billsRouter } from '../modules/bill/router';
import { transactionRouter } from '../modules/transactions/router';
import { serviceRouter, servicesRouter } from '../modules/service/router';
import { referrerRouter, referrersRouter } from '../modules/referrer/router';

export const appRouter = Router();

appRouter.use('/auth', authRouter);
appRouter.use('/service', serviceRouter);
appRouter.use('/services', servicesRouter);
appRouter.use('/bill', billRouter);
appRouter.use('/bills', billsRouter);
appRouter.use('/patients', patientsRouter);
appRouter.use('/overview', overviewRouter);
appRouter.use('/referrer', referrerRouter);
appRouter.use('/referrers', referrersRouter);
appRouter.use('/transaction', transactionRouter);
