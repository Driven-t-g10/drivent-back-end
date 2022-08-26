import { AuthenticatedRequest } from '@/middlewares';
import { CreateUserTicketSchema } from '@/schemas/user-ticket-schemas';
import userTicketService from '@/services/user-ticket-service';
import { Response } from 'express';
import httpStatus from 'http-status';

export async function createUserTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { hasHotel } = req.body as CreateUserTicketSchema;
  const ticketId = parseInt(req.params.ticketId);
  const userTicket = await userTicketService.createUserTicket({ userId, ticketId, hasHotel });

  return res.status(httpStatus.CREATED).send(userTicket);
}

export async function getUserTicketByUserId(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const userTicket = await userTicketService.getUserTicketByUserId(userId);

  return res.status(httpStatus.OK).send({ userTicket });
}

export async function updatePayment(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { id } = req.params;
  await userTicketService.updatePayment(userId, +id);

  res.sendStatus(httpStatus.OK);
}
