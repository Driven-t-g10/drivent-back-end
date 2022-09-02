import { prisma, redis } from '@/config';
import { eventSeedData } from '@/utils/eventSeedData';

async function findFirst() {
  const cacheKey = 'event';
  const EXPIRATION = 3600 * 6;

  try {
    const cachedEvent = await redis.get(cacheKey);
    if (cachedEvent) {
      console.log('return do redis');

      return JSON.parse(cachedEvent);
    } else {
      console.log('return da seed');

      const event = eventSeedData();

      redis.setEx(cacheKey, EXPIRATION, JSON.stringify(event));

      return event;
    }
  } catch (error) {
    console.log(error);
  }
}

const eventRepository = {
  findFirst,
};

export default eventRepository;
