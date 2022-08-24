import { createUserTicket, getUserTicketByUserId } from '@/controllers/user-ticket-controller';
import { authenticateToken } from '@/middlewares';
import { Router } from 'express';

const userTicketRouter = Router();

userTicketRouter.all('*', authenticateToken).get('/', getUserTicketByUserId).post('/:ticketId', createUserTicket);

export { userTicketRouter };
