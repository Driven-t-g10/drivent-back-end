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
