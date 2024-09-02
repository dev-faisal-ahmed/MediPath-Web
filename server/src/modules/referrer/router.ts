import { Router } from 'express';
import { authGuard } from '../../middlewares';
import { refererController } from './controller';

export const referrerRouter = Router();
export const referrersRouter = Router();

// referrer
referrerRouter.post('/', authGuard, refererController.addReferrer);
referrerRouter.get(
  '/:referrerId',
  authGuard,
  refererController.getReferrerById,
);

referrerRouter.patch(
  '/:referrerId',
  authGuard,
  refererController.updateReferrer,
);

referrerRouter.delete(
  '/:referrerId',
  authGuard,
  refererController.deleteReferrer,
);

// referrers
referrersRouter.get('/', authGuard, refererController.getReferrers);
