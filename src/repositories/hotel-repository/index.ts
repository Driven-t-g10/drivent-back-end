import { prisma } from '@/config';

async function getRoomsWithUsers(hotelId: number) {
  return prisma.room.findMany({
    where: {
      hotelId,
    },
    include: {
      UserRoom: true,
    },
  });
}

async function getHotels() {
  const hotels = await prisma.$queryRaw`SELECT h.id, h.name, h.image, 
  SUM(r.beds) AS spaces, 
  COUNT(ur.id) AS occupied 
  FROM "Hotel" h
  JOIN "Room" r ON r."hotelId" = h.id
  LEFT JOIN "UserRoom" ur ON ur."roomId" = r.id
  GROUP BY h.id`;

  return hotels;
}

async function confirmReservation(roomId: number, userId: number) {
  return prisma.userRoom.upsert({
    where: {
      userId,
    },
    create: {
      roomId,
      userId,
    },
    update: {
      roomId,
    },
  });
}

async function getRoomById(id: number) {
  return prisma.room.findUnique({
    where: {
      id,
    },
  });
}

const hotelRepository = { getHotels, getRoomsWithUsers, confirmReservation, getRoomById };
export default hotelRepository;
