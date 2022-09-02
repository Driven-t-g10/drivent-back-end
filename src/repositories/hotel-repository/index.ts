import { prisma, redis } from '@/config';
import dotenv from 'dotenv';

dotenv.config();

async function getHotels() {
  const cacheKey = 'hotels';
  const EXPIRATION = 3600;

  try {
    const cachedHotels = await redis.get(cacheKey);
    if (cachedHotels) {
      console.log('return do redis');

      return JSON.parse(cachedHotels);
    } else {
      console.log('return do pg');

      const hotels = await prisma.$queryRaw`SELECT h.id, h.name, h.image,
      SUM(r.beds) AS spaces,
      COUNT(ur.id) AS occupied
      FROM "Hotel" h
      JOIN "Room" r ON r."hotelId" = h.id
      LEFT JOIN "UserRoom" ur ON ur."roomId" = r.id
      GROUP BY h.id`;

      // const hotels = await prisma.hotel.findMany();

      redis.setEx(cacheKey, EXPIRATION, JSON.stringify(hotels)); //TODO: adicionar info de vagas;
      //TODO: quando reservar quarto, limpar redis

      return hotels;
    }
  } catch (error) {
    console.log(error);
  }
}

// select * from "Hotel"
// insert into "Hotel" ('eventId', 'name', 'image') values (298, 'teste', 'imageTests')

const hotelRepository = { getHotels };

export default hotelRepository;
