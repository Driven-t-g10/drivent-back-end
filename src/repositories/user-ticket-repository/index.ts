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

const userTicketRepository = {
  createUserTicket,
  getUserTicketByUserId,
};

export default userTicketRepository;
