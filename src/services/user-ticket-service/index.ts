import { notFoundError } from '@/errors';
import ticketRepository from '@/repositories/ticket-repository';
import userTicketRepository from '@/repositories/user-ticket-repository';
import { UserTicket } from '@prisma/client';

async function createUserTicket(data: CreateUserTicketParams): Promise<UserTicket> {
  const ticket = await ticketRepository.getTicketById(data.ticketId);
  if (!ticket) {
    throw notFoundError();
  }

  if (ticket.name.toLowerCase() === 'online') {
    data.hasHotel = false;
  }

  return userTicketRepository.createUserTicket(data);
}

async function getUserTicketByUserId(userId: number): Promise<UserTicket | null> {
  const userTicket = await userTicketRepository.getUserTicketByUserId(userId);

  return userTicket;
}

const userTicketService = {
  createUserTicket,
  getUserTicketByUserId,
};

export type CreateUserTicketParams = Pick<UserTicket, 'ticketId' | 'hasHotel' | 'userId'>;
export default userTicketService;
