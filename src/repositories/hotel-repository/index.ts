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

const hotelRepository = { getRoomsWithUsers };
export default hotelRepository;
