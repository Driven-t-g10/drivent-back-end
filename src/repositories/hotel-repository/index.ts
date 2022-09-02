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

const hotelRepository = { getHotels, getRoomsWithUsers };
export default hotelRepository;
