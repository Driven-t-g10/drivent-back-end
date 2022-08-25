import { updatePayment } from '@/controllers/user-tickets-controller';
import { authenticateToken, validateParams } from '@/middlewares';
import { updatePaymentParam } from '@/schemas';
import { Router } from 'express';

const userTicketRouter = Router();

userTicketRouter.all('/*', authenticateToken).patch('/payment/:id', validateParams(updatePaymentParam), updatePayment);

export { userTicketRouter };
