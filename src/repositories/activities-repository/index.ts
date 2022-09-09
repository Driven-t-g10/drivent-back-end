import { prisma } from '@/config';

async function getDates() {
  return prisma.schedule.groupBy({
    by: ['date', 'createdAt'],
    orderBy: { createdAt: 'asc' },
  });
}

async function getPlaces() {
  return prisma.activity.groupBy({
    by: ['place', 'createdAt'],
    orderBy: { createdAt: 'asc' },
  });
}

async function getActivitiesByPlaceAndDate(place: string, date: string) {
  return prisma.activity.findMany({
    where: {
      place,
    },
    include: {
      Schedule: {
        where: {
          date,
        },
        include: {
          UserActivity: {
            select: {
              userId: true,
            },
          },
        },
      },
    },
  });
}

async function getUserActivities(userId: number) {
  const schedulesIds = await prisma.userActivity.findMany({
    where: {
      userId,
    },
    select: {
      scheduleId: true,
    },
  });
  const activities = [];
  for (const scheduleId of schedulesIds) {
    const activity = await prisma.schedule.findUnique({
      where: {
        id: scheduleId.scheduleId,
      },
      include: {
        Activity: true,
      },
    });
    activities.push(activity);
  }
  return activities;
}

async function getScheduleUsers(scheduleId: number) {
  return prisma.schedule.findUnique({
    where: {
      id: scheduleId,
    },
    include: {
      UserActivity: {
        select: {
          userId: true,
        },
      },
    },
  });
}

const activitiesRepositoy = { getDates, getPlaces, getActivitiesByPlaceAndDate, getUserActivities, getScheduleUsers };
export default activitiesRepositoy;
