import { Router } from 'express';
import { authGuard } from '../../middlewares';
import { agentController } from './controllers';

export const agentRouter = Router();
export const agentsRouter = Router();

// agent router
agentRouter.post('/', authGuard, agentController.addAgent);

// agents router
agentsRouter.get('/', authGuard, agentController.getAgents);
