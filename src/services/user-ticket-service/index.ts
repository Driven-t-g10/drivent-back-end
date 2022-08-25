import { notFoundError, unauthorizedError } from '@/errors';
import userTicketRepository from '@/repositories/user-ticket-repository';

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

const userTicketService = { updatePayment };

export default userTicketService;
