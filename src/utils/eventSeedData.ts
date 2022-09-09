import dayjs from 'dayjs';

export function eventSeedData() {
  return {
    title: 'Driven.t',
    logoImageUrl: 'https://files.driveneducation.com.br/images/logo-rounded.png',
    backgroundImageUrl: 'linear-gradient(to right, #FA4098, #FFD77F)',
    startsAt: dayjs().subtract(1, 'days').toDate(),
    endsAt: dayjs().add(21, 'days').toDate(),
  };
}
