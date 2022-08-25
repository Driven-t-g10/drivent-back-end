import { createUserTicket, getUserTicketByUserId, updatePayment } from '@/controllers/user-ticket-controller';
import { authenticateToken, validateParams } from '@/middlewares';
import { updatePaymentParam } from '@/schemas';
import { Router } from 'express';

const userTicketRouter = Router();

userTicketRouter
  .all('*', authenticateToken)
  .get('/', getUserTicketByUserId)
  .post('/:ticketId', createUserTicket)
  .patch('/payment/:id', validateParams(updatePaymentParam), updatePayment);

export { userTicketRouter };
