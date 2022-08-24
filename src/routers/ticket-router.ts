import { Router } from 'express';

import { getTickets } from '@/controllers';

const ticketsRouter = Router();
ticketsRouter.get('/', getTickets);

export { ticketsRouter };
