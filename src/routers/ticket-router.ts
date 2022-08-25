import { Router } from 'express';

import { getTickets } from '@/controllers';
import { authenticateToken } from '@/middlewares';

const ticketsRouter = Router();
ticketsRouter.get('/', authenticateToken, getTickets);

export { ticketsRouter };
