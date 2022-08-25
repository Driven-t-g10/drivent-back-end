import { prisma } from '@/config';

async function getTicketById(ticketId: number) {
  return prisma.userTicket.findFirst({
    where: { id: ticketId },
  });
}

async function updatePayment(ticketId: number) {
  await prisma.userTicket.update({
    where: { id: ticketId },
    data: { isPaid: true },
  });
}

const userTicketRepository = { getTicketById, updatePayment };

export default userTicketRepository