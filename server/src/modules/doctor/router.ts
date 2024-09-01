import { Router } from 'express';
import { doctorController } from './controllers';
import { authGuard } from '../../middlewares';

export const doctorRouter = Router();
export const doctorsRouter = Router();

// doctor
doctorRouter.post('/', authGuard, doctorController.addDoctor);
doctorRouter.patch('/:doctorId', authGuard, doctorController.updateDoctor);

// doctors
doctorsRouter.get('/', authGuard, doctorController.getDoctors);
