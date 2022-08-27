import { UserTicket } from '@prisma/client';
import { prisma } from '@/config';

export function createUserTicket(params: Partial<UserTicket>): Promise<UserTicket> {
  return prisma.userTicket.create({
    data: {
      userId: params.userId,
      ticketId: params.ticketId,
    },
  });
}

export function getUserTicket(userId: number | undefined = undefined): Promise<UserTicket> {
  if (!userId) {
    return prisma.userTicket.findFirst({});
  }
  return prisma.userTicket.findUnique({ where: { userId } });
}
