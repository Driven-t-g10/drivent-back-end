import { prisma, redis } from '@/config';

async function findFirst() {
  const cacheKey = 'event';

  try {
    const cachedEvent = await redis.get(cacheKey);
    if (cachedEvent) {
      console.log('return do redis');

      return JSON.parse(cachedEvent);
    } else {
      console.log('return do pg');

      const event = prisma.event.findFirst();

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
