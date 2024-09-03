import { Router } from 'express';
import { authGuard } from '../../middlewares';
import { transactionController } from './controllers';

export const transactionRouter = Router();

// transaction
transactionRouter.post('/', authGuard, transactionController.giveCommission);
