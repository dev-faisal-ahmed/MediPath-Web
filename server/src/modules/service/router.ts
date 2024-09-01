import { Router } from 'express';
import { authGuard } from '../../middlewares';
import { serviceController } from './controllers';

export const serviceRouter = Router();
export const servicesRouter = Router();

// service router
serviceRouter.post('/', authGuard, serviceController.addService);
serviceRouter.patch('/:serviceId', authGuard, serviceController.updateService);
serviceRouter.delete('/:serviceId', authGuard, serviceController.deleteService);

// services router
servicesRouter.get('/', authGuard, serviceController.getServices);
