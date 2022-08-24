import { prisma } from '@/config';

async function getTickets() {
  return prisma.ticket.findMany();
}

async function getTicketById(id: number) {
  return prisma.ticket.findUnique({ where: { id } });
}

const ticketRepository = { getTickets, getTicketById };

export default ticketRepository;
