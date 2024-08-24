import { Router } from 'express';
import { doctorController } from './controllers';
import { authGuard } from '../../middlewares/authGuard';

export const doctorRouter = Router();
export const doctorsRouter = Router();

// doctor
doctorRouter.post('/', authGuard, doctorController.addDoctor);

// doctors
doctorsRouter.get('/', authGuard, doctorController.getDoctors);
