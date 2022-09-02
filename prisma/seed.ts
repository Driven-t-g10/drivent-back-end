import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
const prisma = new PrismaClient();

async function main() {
  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: 'Driven.t',
        logoImageUrl: 'https://files.driveneducation.com.br/images/logo-rounded.png',
        backgroundImageUrl: 'linear-gradient(to right, #FA4098, #FFD77F)',
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, 'days').toDate(),
      },
    });
  }
  let ticket = await prisma.ticket.findFirst();
  if (!ticket) {
    await prisma.ticket.create({
      data: {
        name: 'Presencial',
        price: 250,
        quantity: 300,
        eventId: event.id,
        hotelPrice: 350,
      },
    });

    await prisma.ticket.create({
      data: {
        name: 'Online',
        price: 100,
        quantity: 300,
        eventId: event.id,
        hotelPrice: 0,
      },
    });
  }
  let hotel = await prisma.hotel.findFirst();
  if (!hotel) {
    hotel = await prisma.hotel.create({
      data: {
        name: 'Driven Resort',
        eventId: event.id,
        image: 'https://media-cdn.tripadvisor.com/media/photo-s/16/1a/ea/54/hotel-presidente-4s.jpg',
      },
    });
    await prisma.hotel.create({
      data: {
        name: 'Driven Palace',
        eventId: event.id,
        image: 'https://www.ahstatic.com/photos/5451_ho_00_p_1024x768.jpg',
      },
    });
    await prisma.hotel.create({
      data: {
        name: 'Driven World',
        eventId: event.id,
        image:
          'https://imgcy.trivago.com/c_lfill,d_dummy.jpeg,e_sharpen:60,f_auto,h_450,q_auto,w_450/itemimages/96/95/96959_v6.jpeg',
      },
    });

    function generateRooms(hotelId: number) {
      let min: number;
      let max: number;
      if (hotelId === 1) {
        min = 1;
        max = 3;
      } else if (hotelId === 2) {
        min = 1;
        max = 2;
      } else {
        min = 1;
        max = 1;
      }
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    for (let i = hotel.id; i <= hotel.id + 2; i++) {
      for (let j = 1; j <= 4; j++) {
        for (let k = 1; k <= 4; k++) {
          await prisma.room.create({
            data: {
              number: Number(`${j}0${k}`),
              hotelId: i,
              beds: generateRooms(i),
            },
          });
        }
      }
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
