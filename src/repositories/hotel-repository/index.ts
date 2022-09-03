import { prisma, redis } from '@/config';
import { Hotel } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

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
  const cacheKey = 'hotels';
  const EXPIRATION = 3600;

  try {
    // const cachedHotels = await redis.get(cacheKey);
    // if (cachedHotels) {
    //   console.log('return do redis');
    //   const hotels: Array<Hotel> = JSON.parse(cachedHotels);
    //   console.log(hotels);
    //   return hotels;
    // } else {
    console.log('return do pg');

    const hotels = await prisma.$queryRaw<any[]>`SELECT h.id, h.name, h.image, 
      (SUM(r.beds) - COUNT(ur.id)) AS spaces
      FROM "Hotel" h
      JOIN "Room" r ON r."hotelId" = h.id
      LEFT JOIN "UserRoom" ur ON ur."roomId" = r.id
      GROUP BY h.id`;

    redis.setEx(cacheKey, EXPIRATION, JSON.stringify(hotels)); //TODO: adicionar info de vagas;
    //TODO: quando reservar quarto, limpar redis

    return hotels;
    // }
  } catch (error) {
    console.log(error);
  }
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

const hotelRepository = { getHotels, getHotelRoomsTypeByHotelId, getRoomsWithUsers, confirmReservation, getRoomById };
export default hotelRepository;
