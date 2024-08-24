import { Router } from 'express';
import { authGuard } from '../../middlewares';
import { serviceController } from './controllers';

export const serviceRouter = Router();
export const servicesRouter = Router();

// service router
serviceRouter.post('/', authGuard, serviceController.addService);

// services router
servicesRouter.get('/', authGuard, serviceController.getServices);
