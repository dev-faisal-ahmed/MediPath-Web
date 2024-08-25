import { Router } from 'express';
import { authGuard } from '../../middlewares';
import { patientController } from './controllers';

export const patientsRouter = Router();

// patients
patientsRouter.get('/', authGuard, patientController.getPatients);
