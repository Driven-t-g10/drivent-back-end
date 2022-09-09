import dayjs from 'dayjs';
import faker from '@faker-js/faker';

interface Event {
  title: string;
  backgroundImageUrl: string;
  logoImageUrl: string;
  startsAt: Date;
  endsAt: Date;
}
export function createEvent(params: Partial<Event> = {}) {
  const data = {
    title: params.title || faker.lorem.sentence(),
    backgroundImageUrl: params.backgroundImageUrl || faker.image.imageUrl(),
    logoImageUrl: params.logoImageUrl || faker.image.imageUrl(),
    startsAt: params.startsAt || dayjs().subtract(1, 'day').toDate(),
    endsAt: params.endsAt || dayjs().add(5, 'days').toDate(),
  };
  return data;
}
