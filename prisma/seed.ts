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
  const hotel = await prisma.hotel.findFirst();
  if (!hotel) {
    await prisma.hotel.createMany({
      data: [
        {
          eventId: event.id,
          name: 'Driven Resort',
          image: 'https://media-cdn.tripadvisor.com/media/photo-s/16/1a/ea/54/hotel-presidente-4s.jpg',
        },
        {
          eventId: event.id,
          name: 'Driven Hotel',
          image:
            'https://conteudo.imguol.com.br/c/entretenimento/f2/2022/06/09/hotel-intercontinental-em-sao-paulo-1654791756214_v2_450x600.jpg',
        },
        {
          eventId: event.id,
          name: 'Driven Palace',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFVeamh72HbXmPRwMr0WCYhi75xg8I3fJBOA&usqp=CAU',
        },
      ],
    });
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
