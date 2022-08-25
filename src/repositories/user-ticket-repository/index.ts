import { prisma } from '@/config';
import { UserTicket } from '@prisma/client';

async function createUserTicketOrUpdate(data: Partial<UserTicket>) {
  const createOrUpdateUserTicket = {
    hasHotel: data.hasHotel,
    userId: data.userId,
    ticketId: data.ticketId,
  };

  return prisma.userTicket.upsert({
    where: { userId: data.userId },
    update: createOrUpdateUserTicket,
    create: createOrUpdateUserTicket,
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
  createUserTicketOrUpdate,
  getUserTicketByUserId,
  getTicketById,
  updatePayment,
};

export default userTicketRepository;
