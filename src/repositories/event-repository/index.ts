import { prisma, redis } from '@/config';
import { eventSeedData } from '@/utils/eventSeedData';

async function findFirst() {
  const cacheKey = 'event';
  // const EXPIRATION = 3600 * 6;

  try {
    const cachedEvent = await redis.get(cacheKey);
    if (cachedEvent) {
      return JSON.parse(cachedEvent);
    } else {
      const event = eventSeedData();

      redis.set(cacheKey, JSON.stringify(event));

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
