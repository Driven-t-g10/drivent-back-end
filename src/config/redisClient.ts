import { createClient } from 'redis';

export const redis = createClient({
  url: process.env.REDIS_URL,
});

export async function redisClient() {
  await redis.connect();
}
