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

const activitiesRepositoy = { getDates, getPlaces };
export default activitiesRepositoy;
