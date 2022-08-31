import { prisma } from '@/config';

async function getUserRoomByUserId(userId: number) {
  return prisma.userRoom.findFirst({
    where: { userId },
    include: {
      Room: {
        select: {
          _count: true,
          beds: true,
          number: true,
          id: true,
          Hotel: {
            select: {
              name: true,
              id: true,
              image: true,
            },
          },
        },
      },
    },
  });
}

const userRoomRepository = { getUserRoomByUserId };

export default userRoomRepository;
