import { Router } from 'express';
import { authGuard } from '../../middlewares';
import { billController } from './controllers';

export const billRouter = Router();
export const billsRouter = Router();

// bill
billRouter.post('/', authGuard, billController.generateBill);
billRouter.get('/:billId', authGuard, billController.getBillById);
billRouter.patch('/:billId', authGuard, billController.takeDue);

// bills
billsRouter.get('', authGuard, billController.getAllBills);
