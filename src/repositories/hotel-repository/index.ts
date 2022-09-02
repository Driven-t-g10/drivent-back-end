import { prisma } from '@/config';

async function getHotels() {
  const hotels = await prisma.$queryRaw<any[]>`SELECT h.id, h.name, h.image, 
  (SUM(r.beds) - COUNT(ur.id)) AS spaces
  FROM "Hotel" h
  JOIN "Room" r ON r."hotelId" = h.id
  LEFT JOIN "UserRoom" ur ON ur."roomId" = r.id
  GROUP BY h.id`;

  return hotels;
}

async function getHotelRoomsTypeByHotelId(hotelId: number) {
  const hotelRooms = await prisma.$queryRaw<any[]>`SELECT h.id as "hotelId", 
  CASE
    WHEN r.beds=1 THEN 'Single'
    WHEN r.beds=2 THEN 'Double'
    WHEN r.beds=3 THEN 'Triple'
  END
  AS "roomType"
  FROM "Hotel" h
  JOIN "Room" r ON r."hotelId" = h.id
  WHERE h.id = ${hotelId}
  GROUP BY h.id, r.beds
  ORDER BY "hotelId"`;

  return hotelRooms;
}

const hotelRepository = { getHotels, getHotelRoomsTypeByHotelId };

export default hotelRepository;
