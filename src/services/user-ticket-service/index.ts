import { notFoundError } from '@/errors';
import ticketRepository from '@/repositories/ticket-repository';
import userTicketRepository from '@/repositories/user-ticket-repository';
import { Prisma, UserTicket } from '@prisma/client';

async function createUserTicket(data: Prisma.UserTicketUncheckedCreateInput): Promise<UserTicket> {
  const ticket = await ticketRepository.getTicketById(data.ticketId);
  if (!ticket) {
    throw notFoundError();
  }

  return userTicketRepository.createUserTicket(data);
}

async function getUserTicketByUserId(userId: number): Promise<UserTicket | null> {
  const userTicket = await userTicketRepository.getUserTicketByUserId(userId);

  if (!userTicket) {
    throw notFoundError();
  }

  return userTicket;
}

const userTicketService = {
  createUserTicket,
  getUserTicketByUserId,
};

export default userTicketService;
