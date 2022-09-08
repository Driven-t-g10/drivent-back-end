import { prisma } from '@/config';

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

const activitiesRepositoy = { getDates, getPlaces, getActivitiesByPlaceAndDate };
export default activitiesRepositoy;
