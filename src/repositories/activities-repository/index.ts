import { prisma } from '@/config';

async function getActivityById(activityId: number) {
  return prisma.activity.findUnique({
    where: {
      id: activityId,
    },
  });
}

async function getActivitiesByUserId(userId: number) {
  return prisma.activity.findMany({
    where: {
      UserActivity: {
        some: { User: { id: userId } },
      },
    },
  });
}

async function getUsersActivitiesByActivityId(activityId: number) {
  return prisma.userActivity.findMany({
    where: {
      activityId,
    },
  });
}

async function getScheduleByActivityId(activityId: number) {
  return prisma.schedule.findFirst({
    where: {
      activityId,
    },
  });
}

async function getDates() {
  return prisma.schedule.groupBy({
    by: ['date'],
  });
}

async function getPlaces() {
  return prisma.activity.groupBy({
    by: ['place'],
  });
}

async function setUserActivity(userId: number, activityId: number) {
  return prisma.userActivity.create({
    data: {
      userId,
      activityId,
    },
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
      },
    },
  });
}

const activitiesRepositoy = {
  getDates,
  getPlaces,
  getActivitiesByPlaceAndDate,
  setUserActivity,
  getActivityById,
  getUsersActivitiesByActivityId,
  getActivitiesByUserId,
  getScheduleByActivityId,
};
export default activitiesRepositoy;
