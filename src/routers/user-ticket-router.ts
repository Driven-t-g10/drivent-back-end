import { createUserTicket, getUserTicketByUserId } from '@/controllers/user-ticket-controller';
import { authenticateToken, validateBody } from '@/middlewares';
import { createUserTicketSchema } from '@/schemas/user-ticket-schema';
import { Router } from 'express';

const userTicketRouter = Router();

userTicketRouter
  .all('*', authenticateToken)
  .get('/', getUserTicketByUserId)
  .post('/:ticketId', validateBody(createUserTicketSchema), createUserTicket);

export { userTicketRouter };
