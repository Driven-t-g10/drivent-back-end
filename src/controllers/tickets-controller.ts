import { AuthenticatedRequest } from '@/middlewares';
import { Response } from 'express';
import ticketService from '@/services/tickets-service';

export async function getTickets(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const tickets = await ticketService.getTickets(userId);
  res.send(tickets);
}
