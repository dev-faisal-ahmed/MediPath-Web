import { Router } from 'express';
import { authGuard } from '../../middlewares';
import { overViewController } from './controllers';

export const overviewRouter = Router();

overviewRouter.get('/', authGuard, overViewController.getOverView);
