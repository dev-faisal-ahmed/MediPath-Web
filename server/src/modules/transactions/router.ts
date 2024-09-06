import { Router } from 'express';
import { authGuard } from '../../middlewares';
import { transactionController } from './controllers';

export const transactionRouter = Router();
export const transactionsRouter = Router();

// transaction
transactionRouter.post(
  '/commission',
  authGuard,
  transactionController.giveCommission,
);
transactionRouter.post('/expense', authGuard, transactionController.addExpense);

// transactions
transactionsRouter.get('/', authGuard, transactionController.getExpenses);
