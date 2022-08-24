import { Request, Response } from 'express';
import ticketService from '@/services/tickets-service';

export async function getTickets(req: Request, res: Response) {
  const tickets = await ticketService.getTickets();
  res.send(tickets);
}
