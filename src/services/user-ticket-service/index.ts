import { notFoundError, unauthorizedError } from '@/errors';
import userTicketRepository from '@/repositories/user-ticket-repository';
import ticketRepository from '@/repositories/ticket-repository';
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
  updatePayment
};

export default userTicketService;
