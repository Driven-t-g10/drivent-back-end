import { prisma } from '@/config';
import { Prisma } from '@prisma/client';

async function createUserTicket(data: Prisma.UserTicketUncheckedCreateInput) {
  return prisma.userTicket.create({
    data,
  });
}

async function getUserTicketByUserId(userId: number) {
  const userTicket = await prisma.userTicket.findMany({
    where: {
      userId,
    },
  });

  return userTicket[0];
}

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

const userTicketRepository = {
  createUserTicket,
  getUserTicketByUserId,
  getTicketById,
  updatePayment,
};

export default userTicketRepository;
