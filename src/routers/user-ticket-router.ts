import { createUserTicket, getUserTicketByUserId, updatePayment } from '@/controllers/user-ticket-controller';
import { authenticateToken, validateBody, validateParams } from '@/middlewares';
import { createUserTicketParams, createUserTicketSchema } from '@/schemas/user-ticket-schemas';
import { updatePaymentParam } from '@/schemas';
import { Router } from 'express';

const userTicketRouter = Router();

userTicketRouter
  .all('*', authenticateToken)
  .get('/', getUserTicketByUserId)
  .post('/:ticketId', validateBody(createUserTicketSchema), validateParams(createUserTicketParams), createUserTicket)
  .patch('/payment/:id', validateParams(updatePaymentParam), updatePayment);

export { userTicketRouter };
