import { Router } from 'express';
import { authGuard } from '../../middlewares';
import { billController } from './controllers';

export const billRouter = Router();
export const billsRouter = Router();

// bill
billRouter.post('/', authGuard, billController.generateBill);
billRouter.get('/:billId', authGuard, billController.getBillById);
billRouter.patch('/:billId/take-due', authGuard, billController.takeDue);

billRouter.patch(
  '/:billId/commission',
  authGuard,
  billController.updateCommission,
);

// bills
billsRouter.get('/', authGuard, billController.getAllBills);
