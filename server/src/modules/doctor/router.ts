import { Router } from 'express';
import { doctorController } from './controllers';
import { authGuard } from '../../middlewares/authGuard';

export const doctorRouter = Router();

doctorRouter.post('/', authGuard, doctorController.addDoctor);
