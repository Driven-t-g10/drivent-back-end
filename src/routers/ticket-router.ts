import { Router } from 'express';

import { getTickets } from '@/controllers';
import { authenticateToken } from '@/middlewares';

const ticketsRouter = Router();

ticketsRouter.all('*', authenticateToken);
ticketsRouter.get('/', getTickets);

export { ticketsRouter };
