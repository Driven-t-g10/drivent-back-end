import { prisma } from '@/config';

async function getTickets() {
  return prisma.ticket.findMany();
}

const ticketRepository = { getTickets };

export default ticketRepository;
