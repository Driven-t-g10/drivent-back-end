import { prisma } from '@/config';

async function setUserSchedule(userId: number, scheduleId: number) {
  return prisma.userActivity.create({
    data: {
      userId,
      scheduleId,
    },
  });
}

async function getById(id: number) {
  return prisma.schedule.findUnique({
    where: {
      id,
    },
  });
}

async function getByUserId(userId: number) {
  return prisma.schedule.findMany({
    where: {
      UserActivity: {
        some: {
          userId,
        },
      },
    },
  });
}

const scheduleRepository = {
  getById,
  getByUserId,
  setUserSchedule,
};

export default scheduleRepository;
