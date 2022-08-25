import { notFoundError, unauthorizedError } from '@/errors';
import userTicketRepository from '@/repositories/user-ticket-repository';
import { UserTicket } from '@prisma/client';
import ticketRepository from '@/repositories/ticket-repository';

async function createUserTicket(data: CreateUserTicketParams): Promise<UserTicket> {
  const ticket = await ticketRepository.getTicketById(data.ticketId);
  if (!ticket) {
    throw notFoundError();
  }

  if (ticket.name.toLowerCase() === 'online') {
    data.hasHotel = false;
  }

  return userTicketRepository.createUserTicketOrUpdate(data);
}

async function getUserTicketByUserId(userId: number): Promise<UserTicket | null> {
  const userTicket = await userTicketRepository.getUserTicketByUserId(userId);

  return userTicket;
}

async function updatePayment(userId: number, ticketId: number) {
  const ticket = await userTicketRepository.getTicketById(ticketId);

  if (!ticket) {
    throw notFoundError();
  }

  if (ticket.userId !== userId) {
    throw unauthorizedError();
  }

  await userTicketRepository.updatePayment(ticketId);
}

const userTicketService = {
  createUserTicket,
  getUserTicketByUserId,
  updatePayment,
};

export type CreateUserTicketParams = Pick<UserTicket, 'ticketId' | 'hasHotel' | 'userId'>;
export default userTicketService;
