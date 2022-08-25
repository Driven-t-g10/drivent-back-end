import { Request, Response } from 'express';
import userTicketService from '@/services/user-ticket-service';
import { AuthenticatedRequest } from '@/middlewares';
import httpStatus from 'http-status';

export async function updatePayment(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { id } = req.params;

  await userTicketService.updatePayment(userId, +id);

  res.sendStatus(httpStatus.OK);
}
