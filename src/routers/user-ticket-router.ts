import { createUserTicket, getUserTicketByUserId, updatePayment } from '@/controllers/user-ticket-controller';
import { authenticateToken, validateBody, validateParams } from '@/middlewares';
import { createUserTicketSchema } from '@/schemas/user-ticket-schema';
import { updatePaymentParam } from '@/schemas';
import { Router } from 'express';

const userTicketRouter = Router();

userTicketRouter
  .all('*', authenticateToken)
  .get('/', getUserTicketByUserId)
  .post('/:ticketId', validateBody(createUserTicketSchema), createUserTicket)
  .patch('/payment/:id', validateParams(updatePaymentParam), updatePayment);

export { userTicketRouter };
