import * as jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import { redis } from '@/config';

import { createUser } from './factories';
import { createSession } from './factories/sessions-factory';
import { prisma } from '@/config';

export async function cleanDb() {
  await prisma.userTicket.deleteMany({});
  await prisma.ticket.deleteMany({});
  await prisma.address.deleteMany({});
  await prisma.enrollment.deleteMany({});
  await prisma.userRoom.deleteMany({});
  await prisma.room.deleteMany({});
  await prisma.hotel.deleteMany({});
  await redis.del('event');
  await prisma.session.deleteMany({});
  await prisma.user.deleteMany({});
}

export async function generateValidToken(user?: User) {
  const incomingUser = user || (await createUser());
  const token = jwt.sign({ userId: incomingUser.id }, process.env.JWT_SECRET);

  await createSession(token);

  return token;
}
