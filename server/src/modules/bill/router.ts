import { Router } from 'express';
import { billController } from './controllers';
import { authGuard } from '../../middlewares';

export const billRouter = Router();

billRouter.post('/', authGuard, billController.generateBill);
billRouter.get('/:billId', authGuard, billController.getBillById);
