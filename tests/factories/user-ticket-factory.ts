import faker from '@faker-js/faker';
import { Ticket, UserTicket } from '@prisma/client';
import { prisma } from '@/config';

export function createTicket(params: Partial<Ticket> = {}): Promise<Ticket> {
  const ticketTypes = ['online', 'presential'];
  return prisma.ticket.create({
    data: {
      hotelPrice: params.hotelPrice || faker.datatype.number({ min: 100, max: 2000 }),
      name: params.name || ticketTypes[faker.datatype.number({ min: 0, max: 1 })],
      price: params.price || faker.datatype.number({ min: 100, max: 2000 }),
      quantity: params.quantity || faker.datatype.number({ min: 1, max: 10 }),
      eventId: params.eventId || null,
    },
  });
}

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
