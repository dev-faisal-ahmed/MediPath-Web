import { Router } from 'express';
import { doctorController } from './controllers';

export const doctorRouter = Router();

doctorRouter.post('/', doctorController.addDoctor);
